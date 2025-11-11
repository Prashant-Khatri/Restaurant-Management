import OrderModel from "@/models/Order.models";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";

export async function POST(req : Request){
    try {
        const session=await getServerSession(authOptions)
        console.log(session)
        if(!session){
            return Response.json({
                success : false,
                message : "User unauthorized"
            },{status : 401})
        }
        const {orderItems,table}=await req.json()
        let totalPrice=0;
        for(let i=0;i<orderItems.length;i++){
            totalPrice+=orderItems[i].price
        }
        console.log(totalPrice)
        await dbConnect()
        const newOrder=new OrderModel({
            custId : session.user._id,
            orderItems,
            status : "Preparing",
            table,
            totalPrice
        })
        const savedOrder=await newOrder.save()
        if(!savedOrder){
            return Response.json({
                success : false,
                message : "Couldn't save order"
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "Order Placed successfully"
        },{status : 200})
    } catch (error) {
        console.log("Error in placing order",error)
        return Response.json({
            success : false,
            message : "Error in placing order"
        },{status : 500})
    }
}