"use client"

import Image from "next/image";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { OrderItem } from "@/models/Order.models";
import mongoose from "mongoose";
import toast from "react-hot-toast";

function OrderCard({itemId,name,desc,image,price,setOrder} : any){
    const [quantity,setQuantity]=useState(1)
    const [inCart,setInCart]=useState(false)
    const addTocart=()=>{
        const newOrderItem : OrderItem={
            menuItem : new mongoose.Types.ObjectId(itemId),
            quantity,
            price : quantity * price
        }
        setOrder((prev : OrderItem[]) => [...prev, newOrderItem]);
        setInCart(true);
        toast.success("Successfully added")
    }

    const onDecrement=()=>{
        if(quantity==1){
            toast.error("Order at least in 1 quantity")
            return;
        }
        setOrder((prev : OrderItem[]) =>
        prev.map((item : OrderItem) =>
        item.menuItem.toString() === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
                price: (item.quantity - 1) * price,
            }
            : item
            )
        );
        setQuantity(quantity-1)
    }
    const onIncrement=()=>{
        setOrder((prev : OrderItem[]) =>
        prev.map((item : OrderItem) =>
        item.menuItem.toString() === itemId
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: (item.quantity + 1) * price,
            }
            : item
            )
        );
        setQuantity(quantity+1)
    }

    const removeTocart=()=>{
        setOrder((prev : OrderItem[]) =>
            prev.filter((item : OrderItem) => item.menuItem.toString() !== itemId)
        );
        setInCart(false);
        setQuantity(1);
        toast.success("Removed from cart");
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
            {
                !inCart &&
                <Button onClick={addTocart}>Order</Button>
            }
            {
                inCart && 
                <div>
                    <Button onClick={onDecrement}>-</Button>
                    <p>{quantity}</p>
                    <Button onClick={onIncrement}>+</Button>
                </div>
            }
            {
                inCart &&
                <Button onClick={removeTocart}>Remove</Button>
            }
        </CardFooter>
        </Card>
    );
}

export default OrderCard;