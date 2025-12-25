import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/models/Order.models";

export async function DELETE(req : Request,{params} : {params : {orderId : string}}){
    try {
        const {orderId}=await params;
        await dbConnect()
        const res=await OrderModel.findByIdAndDelete(orderId)
        if(!res){
            return Response.json({
                success : false,
                message : "Couldn't find order"
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "Order Deleted Successfully"
        },{status : 200})
    } catch (error) {
        console.log("Error in deleting order",error)
        return Response.json({
            success : false,
            message : "Error in deleting order"
        },{status : 500})
    }
}