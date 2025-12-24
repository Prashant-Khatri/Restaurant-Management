"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrderType } from "../pending-order/page";

function PendingOrdersPage(){
    const [orders,setOrders]=useState<OrderType[] | null>([])
    const getServedOrders=async ()=>{
        try {
            const res=await axios.get('/api/order/get-served-orders')
            if(!res){
                toast.error("Couldn't get server orders")
                return;
            }
            setOrders(res.data.orders)
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log(axiosError.response?.data.message)
            toast.error(axiosError.response?.data.message || "")
        }
    }
    useEffect(()=>{
        getServedOrders()
    },[])
    return (
        <div>
            {
                orders ? 
                (
                    orders.length>0 ? (
                        <>
                        {
                            orders.map(order=>(
                                <Card key={order._id}>
                                <CardHeader>
                                    <CardTitle>Order for Table No : {order.table}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                    <TableHeader>
                                        <TableRow>
                                        <TableHead className="w-[100px]">OrderItem</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            order.orderItems.map(orderItem=>(
                                                <TableRow key={orderItem._id}>
                                                <TableCell className="font-medium">{orderItem.menuItem.name}</TableCell>
                                                <TableCell>{orderItem.quantity}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter>
                                    <h3>Total Amount : {order.totalPrice}</h3>
                                </CardFooter>
                                </Card>
                            ))
                        }
                        </>
                    ) : (<div>No Served Orders</div>)
                ) : (<span>Spinner</span>)
            }
        </div>
    );
}

export default PendingOrdersPage;