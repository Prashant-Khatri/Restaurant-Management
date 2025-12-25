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
        <Card
          className="
            group
            flex flex-col
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-900
            shadow-sm hover:shadow-lg
            transition-all duration-300
          "
        >
          {/* Image */}
          <div className="relative w-full h-40 overflow-hidden rounded-t-2xl">
            <img
              src={image}
              alt={name}
              className="
                w-full h-full object-cover
                group-hover:scale-105 transition-transform duration-300
              "
            />
          </div>

          {/* Header */}
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {name}
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 line-clamp-2">
              {desc}
            </CardDescription>
          </CardHeader>

          {/* Content */}
          <CardContent className="flex items-center justify-between">
            <span className="text-lg font-bold text-emerald-600">
              ₹ {price}
            </span>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex justify-end pt-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="
                    w-full
                    border-emerald-500 text-emerald-600
                    hover:bg-emerald-50 dark:hover:bg-emerald-900
                  "
                >
                  Update
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Update Menu Item
                  </DialogTitle>
                  <DialogDescription className="text-slate-500">
                    Modify details and click update to save.
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
                              placeholder={name}
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
                              placeholder={desc}
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
                              placeholder={`${price}`}
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
                        Update
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
    );
}

export default MenuItemCard;