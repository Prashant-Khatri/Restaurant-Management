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
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 px-4 py-6">
            {menu ? (
                menu.length > 0 ? (
                <div className="max-w-7xl mx-auto space-y-6">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                        Menu Items
                    </h1>

                    {/* Add Item Button */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                        <Button
                            onClick={() => setOpen(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                        >
                            + Add New Item
                        </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px] rounded-xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">
                            Add Menu Item
                            </DialogTitle>
                            <DialogDescription className="text-slate-500">
                            Fill the details below and save the item.
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                            >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder="Enter item name"
                                        className="focus-visible:ring-emerald-500"
                                        {...field}
                                    />
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
                                    <Input
                                        placeholder="Enter description"
                                        className="focus-visible:ring-emerald-500"
                                        {...field}
                                    />
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
                                        className="cursor-pointer"
                                        onChange={(e) =>
                                        field.onChange(e.target.files?.[0])
                                        }
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
                                    <Input
                                        type="number"
                                        placeholder="₹ Price"
                                        className="focus-visible:ring-emerald-500"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-3 pt-2">
                                <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                Save
                                </Button>
                            </div>
                            </form>
                        </Form>
                        </DialogContent>
                    </Dialog>
                    </div>

                    {/* Menu Grid */}
                    <div className="
                    grid gap-6
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    ">
                    {menu.map((menuItem) => (
                        <MenuItemCard
                        key={menuItem._id}
                        name={menuItem.name}
                        desc={menuItem.desc}
                        image={menuItem.image}
                        price={menuItem.price}
                        menuItemid={menuItem._id}
                        getMenu={getMenu}
                        />
                    ))}
                    </div>
                </div>
                ) : (
                <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
                    <p className="text-lg">No items in menu currently 🍽️</p>
                </div>
                )
            ) : (
                <div className="flex items-center justify-center h-[60vh]">
                <span className="animate-pulse text-slate-500">Loading...</span>
                </div>
            )}
            </div>
    )
}

export default MenuPage;