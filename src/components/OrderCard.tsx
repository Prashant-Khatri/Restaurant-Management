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
        <Card
            className="
                flex flex-col
                hover:shadow-xl transition-shadow
                border border-slate-200 dark:border-slate-800
                rounded-2xl overflow-hidden
                bg-white dark:bg-slate-900
            "
            >
            {/* Header */}
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {name}
                </CardTitle>
                <CardDescription className="text-sm text-slate-500 line-clamp-2">
                {desc}
                </CardDescription>
            </CardHeader>

            {/* Image */}
            <CardContent className="flex items-center justify-center py-4">
                <img
                src={image}
                alt={name}
                className="
                    w-40 h-40
                    object-cover
                    rounded-xl
                    shadow-md
                    transition-transform
                    hover:scale-105
                "
                />
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex flex-col gap-3">
                {!inCart && (
                <Button
                    onClick={addTocart}
                    className="
                    w-full
                    bg-emerald-600 hover:bg-emerald-700
                    text-white font-semibold
                    "
                >
                    Add to Order
                </Button>
                )}

                {inCart && (
                <div className="flex items-center justify-between w-full gap-3">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-2 py-1">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={onDecrement}
                        className="h-8 w-8"
                    >
                        −
                    </Button>

                    <span className="min-w-6 text-center font-semibold text-slate-700 dark:text-slate-200">
                        {quantity}
                    </span>

                    <Button
                        size="icon"
                        variant="outline"
                        onClick={onIncrement}
                        className="h-8 w-8"
                    >
                        +
                    </Button>
                    </div>

                    {/* Remove */}
                    <Button
                    variant="destructive"
                    onClick={removeTocart}
                    className="px-4"
                    >
                    Remove
                    </Button>
                </div>
                )}
            </CardFooter>
            </Card>
    );
}

export default OrderCard;