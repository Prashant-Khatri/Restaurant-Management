"use client"

import OrderCard from "@/components/OrderCard";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MenuItem } from "@/models/MenuItem.models";
import { OrderItem } from "@/models/Order.models";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function PlaceOrderPage(){
    const [menu,setMenu]=useState<MenuItem[] | null>(null)
    const [orderPlaced,setOrderPlaced]=useState<Boolean>(false)
    const [order,setOrder]=useState<OrderItem[]>([])
    const router=useRouter()
    const form=useForm()
    const getMenu=async ()=>{
        try {
            const response=await axios.get('/api/menu')
            if(!response){
                toast.error("Couldn't fetch menu refresh again")
                return;
            }
            setMenu(response.data.menuItems)
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log(axiosError.response?.data.message || "")
            toast.error(axiosError.response?.data.message || "")
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
            setOrderPlaced(true)
            toast.success("Order placed successfully")
        } catch (error) {
            console.log("Error in placing order",error)
            toast.error("Error in placing order")            
        }
    }
    useEffect(()=>{
        getMenu()
    },[])
    return (
        <div>
            {
                orderPlaced ? (
                    <div>
                        <span>You have already place an order</span>
                        <Button onClick={()=>router.push('/my-order')}>View Your Order</Button>
                    </div>
                ) : 
                (
                    menu ? 
                    (
                        menu.length>0 ? (
                            <div>
                                {
                                    menu.map(menuItem=>(
                                        <OrderCard key={menuItem._id} itemId={menuItem._id} name={menuItem.name} desc={menuItem.desc} image={menuItem.image} price={menuItem.price} order={order} setOrder={setOrder}/>
                                    ))
                                }
                                <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <Controller
                                        name="table"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                        <div>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select your table" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
                                            </SelectContent>
                                            </Select>
                                            {fieldState.error && (
                                                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                            )}
                                        </div>
                                        )}
                                    />
                                    <Button type="submit">Place-Order</Button>
                                </form>
                                </Form>
                            </div>
                        ) : (<div>No menu item</div>)
                    ) : (<span>Spinner</span>)
                )
            }
        </div>
    );
}

export default PlaceOrderPage;