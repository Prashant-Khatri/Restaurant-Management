import OrderModel from "@/models/Order.models"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import MenuItemModel from "@/models/MenuItem.models"

export async function GET(req : Request){
    try {
        await dbConnect()
        const orderWithUserId=await OrderModel.findOne({custId : "690f2a8c888e734c7791a4a2"}).populate("orderItems.menuItem", "name price image")
        if(!orderWithUserId){
            return Response.json({
                success : false,
                message : "No order made yet",
                order : []
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "Order fetched successfully",
            order : orderWithUserId.orderItems
        },{status : 200})
    } catch (error) {
        console.log("Error in fetching order",error)
        return Response.json({
            success : false,
            message : "Error in fetching order"
        },{status : 500})
    }
}