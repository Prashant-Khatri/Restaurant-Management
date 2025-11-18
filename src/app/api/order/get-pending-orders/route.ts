import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/models/Order.models";

export async function GET(req : Request){
    try {
        await dbConnect()
        const res=await OrderModel.find({
            status : "Preparing"
        }).populate("orderItems.menuItem","name")
        if(!res){
            return Response.json({
                success : false,
                message : "Couldn't fetch pending orders"
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "Pending orders fetched successfully",
            orders : res
        },{status : 200})
    } catch (error) {
        console.log('Error in fetching pending orders',error)
        return Response.json({
            success : false,
            message : "Error in fetching pending orders"
        },{status : 500})
    }
}