"use client"
import axios from "axios";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import toast from "react-hot-toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

function MenuItemCard({name,desc,image,price,menuItemid,getMenu} : any){
    const form=useForm({
        defaultValues : {
            name : undefined,
            desc : undefined,
            price : undefined,
            image : undefined
        }
    })
    const [open,setOpen]=useState(false)
    const router=useRouter()
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
            const res=await axios.patch(`/api/menu/update/${menuItemid}`,formData)
            if(!res){
                toast.error("Couldn't update menuitem")
                return;
            }
            toast.success("MenuItem updated successfully")
            setOpen(false)
            form.reset()
            await getMenu()
        } catch (error) {
            console.log("Error in updating menuitem",error)
            toast.error("Error in updating menuitem")
        }
    }
    return (
        <Card>
        <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent>
            <img src={image} alt={name} width={80} height={80}></img>
        </CardContent>
        <CardFooter>
            <p>Price : {price}</p>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
          <Button variant="outline">Update</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update MenuItem</DialogTitle>
            <DialogDescription>
              Make changes to this MenuItem here. Click Update when you are
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
                <Input placeholder={name} {...field} />
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
              <FormLabel>Desc</FormLabel>
              <FormControl>
                <Input placeholder={desc} {...field} />
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
                <Input type="number" placeholder={price} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                    <Button type="submit">Update</Button>
              </form>
      </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
        </CardFooter>
        </Card>
    );
}

export default MenuItemCard;