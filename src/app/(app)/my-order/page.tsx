"use client"
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type OrderItemType={
    menuItem : {
        name : string;
        image : string
    };
    quantity : number;
    price : number
    _id : string;
}

function MyOrderPage(){
    const [myOrder,setMyOrder]=useState<OrderItemType[]>([])
    const [totalPrice,setTotalPrice]=useState(0)
    const [orderStatus,setOrderStatus]=useState("")
    const [orderId,setOrderId]=useState("")
    const router=useRouter()
    const getMyOrder=async ()=>{
        try {
            const res=await axios.get('/api/order/my-order')
            console.log(res)
            if(!res){
                toast.error('Error in geting your order')
                return;
            }
            setMyOrder(res.data.order)
            if(res.data.order.length==0){
                toast.error("No order placed yet")
                return;
            }
            setTotalPrice(res.data.totalPrice)
            setOrderStatus(res.data.orderStatus)
            setOrderId(res.data.orderId)
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log(axiosError.response?.data.message)
            toast.error(axiosError.response?.data.message || "")
        }
    }
    const deleteHandler=async()=>{
        try {
            const res=await axios.delete(`/api/delete-order/${orderId}`)
            if(!res){
                toast.error("Couldn't delete order")
                return;
            }
            await getMyOrder()
            toast.success("Order deleted successfully")
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log("Error deleting order",axiosError.response?.data.message)
            toast.error(axiosError.response?.data?.message || "")
        }
    }
    useEffect(()=>{
        getMyOrder()
        console.log("hello")
        console.log(myOrder)
    },[])
    return (
        <div>
            {
                myOrder.length>0 ? (
                    <div>
                        <h1>Order Status : {orderStatus}</h1>
                        {
                            myOrder.map(orderItem=>(
                                <Card key={orderItem._id}>
                                <CardHeader>
                                    <CardTitle>{orderItem.menuItem.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img src={orderItem.menuItem.image}></img>
                                </CardContent>
                                <CardFooter>
                                    <p>Quantity : {orderItem.quantity}</p>
                                    <p>Price : {orderItem.price}</p>
                                </CardFooter>
                                </Card>
                            ))
                        }
                        <h2>Total Price of your order : {totalPrice}</h2>
                        {
                            orderStatus==="Served" &&
                            <Button onClick={()=>router.push(`/payment/order/${orderId}?amount=${totalPrice}`)}>Pay : {totalPrice} for your order</Button>
                        }
                        {
                            orderStatus==='Preparing' &&
                            <Button onClick={deleteHandler}>Delete Order</Button>
                        }
                    </div>
                ) : (<>Cheetah</>)
            }
        </div>
    )
}

export default MyOrderPage;