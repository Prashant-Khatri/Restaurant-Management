"use client"

import MenuItemCard from "@/components/MenuItemCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type menuType={
    _id : string;
    name : string;
    desc : string;
    image : string;
    price : number
}

function MenuPage(){
    const [menu,setMenu]=useState<menuType[] | null>(null)
    const router=useRouter()
    const [open, setOpen] = useState(false);
    const form=useForm({
        defaultValues : {
            name : undefined,
            desc : undefined,
            price : undefined,
            image : undefined
        }
    })
    const onSubmit=async (data : any)=>{
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("price", data.price);
            formData.append("desc", data.desc);

            // image file
            if (data.image) {
                formData.append("image", data.image);
            }
            const res=await axios.post('/api/menu/add',formData)
            if(!res){
                toast.error("Couldn't add menuitem")
                return;
            }
            toast.success("MenuItem added successfully")
            setOpen(false)
            form.reset()
            await getMenu()
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log("Error in updating menuitem",axiosError.response?.data.message)
            toast.error(axiosError.response?.data.message || "")
        }
    }
    const getMenu=async ()=>{
        try {
            const res=await axios.get('/api/menu')
            if(!res){
                toast.error("Couldn't fetch menu")
                return;
            }
            setMenu(res.data.menuItems)
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log(axiosError.response?.data.message)
            toast.error(axiosError.response?.data.message || "")
        }
    }
    useEffect(()=>{
        getMenu()
        console.log(menu)
    },[])
    return (
        <div>
            {
                menu ? 
                (
                    menu.length>0 ? (
                    <div>
                    <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild onClick={()=>setOpen(true)}>
                            <Button variant="outline">Add New Item in Menu</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add MenuItem</DialogTitle>
                                <DialogDescription>
                                Add MenuItem here. Click Save when you are
                                done.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter item name here" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="desc"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter item description here" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Enter item price here" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                                        <Button type="submit">Save</Button>
                                </form>
                        </Form>
                            <DialogFooter>
                                <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                                </DialogClose>
                            </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        {
                            menu.map(menuItem=>(
                                <MenuItemCard key={menuItem._id} name={menuItem.name} desc={menuItem.desc} image={menuItem.image} price={menuItem.price} menuItemid={menuItem._id} getMenu={getMenu}/>
                            ))
                        }
                    </div>
                ) : (<div>No Item in menu currently</div>)
                ) : ((<span>Spinner</span>))
            }
        </div>
    )
}

export default MenuPage;