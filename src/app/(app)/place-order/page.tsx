"use client"

import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function PlaceOrderPage(){
    const [menu,setMenu]=useState([])
    const [order,setOrder]=useState([])
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
    useEffect(()=>{
        getMenu()
    },[])
    return (
        <div>
            
        </div>
    );
}

export default PlaceOrderPage;