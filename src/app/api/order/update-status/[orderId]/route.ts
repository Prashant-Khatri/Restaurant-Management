import dbConnect from "@/lib/dbConnect"
import OrderModel from "@/models/Order.models"
import mongoose from "mongoose"

export async function PATCH(req : Request,{params} : {params : {orderId : string}}){
    try {
        const {status}=await req.json()
        const {orderId}=await params;
        console.log(orderId)
        await dbConnect()
        const updatedOrder=await OrderModel.findByIdAndUpdate(
            orderId,
            {status},
            {new : true}
        )
        if(!updatedOrder){
            return Response.json({
                success : false,
                message : "Couldn't update order"
            },{status : 401})
        }
        if (status === "Paid") {
            await OrderModel.findByIdAndDelete(orderId);
            return Response.json({
                success: true,
                message: "Order marked as Paid and deleted from records.",
            },{status : 200});
        }
        return Response.json({
            success : true,
            message : "Order Status updated successfully"
        },{status : 200})
    } catch (error) {
        console.log("Error in updating order status",error)
        return Response.json({
            success : false,
            message : "Error in updating order status"
        },{status : 500})
    }
}