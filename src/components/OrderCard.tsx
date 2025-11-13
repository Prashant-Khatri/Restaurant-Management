"use client"

import Image from "next/image";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

function OrderCard(itemId : string,name : string,desc : string,image : string,price : number,order : any){
    const [quantity,setQuantity]=useState(1)
    const [inCart,setInCart]=useState(false)
    return (
        <Card>
        <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent>
            <Image src={image} alt={name}/>
        </CardContent>
        <CardFooter>
            {
                !inCart &&
                <Button onClick={()=>}>Order</Button>
            }
            {
                inCart && 
                <div>
                    <Button>-</Button>
                    <p>{quantity}</p>
                    <Button>+</Button>
                </div>
            }
            {
                inCart &&
                <Button onClick={()=>}>Remove</Button>
            }
        </CardFooter>
        </Card>
    );
}

export default OrderCard;