import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.models";

export async function GET(req : Request){
    try {
        await dbConnect()
        const res=await UserModel.find({role : "Staff"})
        console.log(res)
        if(!res){
            return Response.json({
                success : false,
                message : "Couldn't fetch staff"
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "Staff fetched successfully",
            staffs : res
        },{status : 200})
    } catch (error) {
        console.log("Error in fetching staffs",error)
        return Response.json({
            success : false,
            message : "Error in fetching staffs",
        },{status : 500})
    }
}