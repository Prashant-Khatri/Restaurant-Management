"use client"

import OrderCard from "@/components/OrderCard";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MenuItem } from "@/models/MenuItem.models";
import OrderModel, { OrderItem } from "@/models/Order.models";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function PlaceOrderPage(){
    const [isLoading,setIsLoading]=useState<Boolean>(false)
    const [menu,setMenu]=useState<MenuItem[] | null>(null)
    const [order,setOrder]=useState<OrderItem[]>([])
    const [isOrderPlaced,setIsOrderPlaced]=useState<Boolean>(false)
    const router=useRouter()
    const form=useForm()
    const getMenu=async()=>{
        try {
            setIsLoading(true)
            const res=await axios.get('/api/order/my-order')
            if(res.data.order.length>0){
                setIsOrderPlaced(true)
                return;
            }
            const response=await axios.get('/api/menu')
            console.log('Place-Order res :',response)
            if(!response){
                toast.error("Couldn't fetch menu refresh again")
                return;
            }
            setMenu(response.data.menuItems)
            setIsLoading(false)
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log(axiosError.response?.data.message || "")
            toast.error(axiosError.response?.data.message || "")
        }finally{
            console.log("Place-Order finally")
            setIsLoading(false)
        }
    }
    const onSubmit=async (data : any)=>{
        try {
            const res=await axios.post('/api/order/place-order',{
                orderItems : order,
                table : data.table
            })
            if(!res){
                toast.error("failed to place order")
                return;
            }
            setIsOrderPlaced(true)
            toast.success("Order placed successfully")
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log("Error in placing order",error)
            toast.error(axiosError.response?.data.message || "")           
        }
    }
    useEffect(()=>{
        getMenu()
    },[])
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 px-4 py-6">
            {isLoading ? (
                <div className="flex items-center justify-center h-[60vh]">
                <span className="animate-pulse text-slate-500">Loading menu...</span>
                </div>
            ) : isOrderPlaced ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    You’ve already placed an order 🍽️
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                    You can track your order status anytime.
                </p>
                <Button
                    onClick={() => router.push("/my-order")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                    View Your Order
                </Button>
                </div>
            ) : menu ? (
                menu.length > 0 ? (
                <div className="max-w-7xl mx-auto space-y-8">
                    <Form {...form}>
                        <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                            flex flex-col sm:flex-row
                            items-center gap-4
                            justify-between
                        "
                        >
                        {/* Table Select */}
                        <Controller
                            name="table"
                            control={form.control}
                            render={({ field, fieldState }) => (
                            <div className="w-full sm:w-48">
                                <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                >
                                <SelectTrigger className="w-full focus:ring-emerald-500">
                                    <SelectValue placeholder="Select table" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Table 1</SelectItem>
                                    <SelectItem value="2">Table 2</SelectItem>
                                    <SelectItem value="3">Table 3</SelectItem>
                                    <SelectItem value="4">Table 4</SelectItem>
                                    <SelectItem value="5">Table 5</SelectItem>
                                </SelectContent>
                                </Select>

                                {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">
                                    {fieldState.error.message}
                                </p>
                                )}
                            </div>
                            )}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="
                            w-full sm:w-auto
                            bg-emerald-600 hover:bg-emerald-700
                            text-white font-semibold
                            px-8
                            "
                        >
                            Place Order
                        </Button>
                        </form>
                    </Form>
                    {/* Header */}
                    <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                        Choose Your Dishes 🍲
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Select items from the menu and place your order
                    </p>
                    </div>

                    {/* Menu Grid */}
                    <div
                    className="
                        grid gap-6
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                    "
                    >
                    {menu.map((menuItem) => (
                        <OrderCard
                        key={menuItem._id}
                        itemId={menuItem._id}
                        name={menuItem.name}
                        desc={menuItem.desc}
                        image={menuItem.image}
                        price={menuItem.price}
                        order={order}
                        setOrder={setOrder}
                        />
                    ))}
                    </div>

                    {/* Order Footer */}
                    <div
                    className="
                        sticky bottom-0
                        bg-white/90 dark:bg-slate-900/90
                        backdrop-blur
                        border-t border-slate-200 dark:border-slate-700
                        p-4 rounded-xl shadow-lg
                    "
                    >
                    </div>
                </div>
                ) : (
                <div className="flex items-center justify-center h-[60vh] text-slate-500">
                    No menu items available 🍽️
                </div>
                )
            ) : (
                <div className="flex items-center justify-center h-[60vh]">
                <span className="animate-pulse text-slate-500">Loading...</span>
                </div>
            )}
            </div>
    );
}

export default PlaceOrderPage;