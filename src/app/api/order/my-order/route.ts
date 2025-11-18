import OrderModel from "@/models/Order.models"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import MenuItemModel from "@/models/MenuItem.models"

export async function GET(req : Request){
    try {
        const session=await getServerSession(authOptions)
        await dbConnect()
        const orderWithUserId=await OrderModel.findOne({custId : session?.user._id}).populate("orderItems.menuItem", "name image")
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
            order : orderWithUserId.orderItems,
            totalPrice : orderWithUserId.totalPrice,
            orderStatus : orderWithUserId.status,
            orderId : orderWithUserId._id
        },{status : 200})
    } catch (error) {
        console.log("Error in fetching order",error)
        return Response.json({
            success : false,
            message : "Error in fetching order"
        },{status : 500})
    }
}