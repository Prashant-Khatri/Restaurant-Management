import dbConnect from "@/lib/dbConnect"
import UserModel from "@/models/User.models"

export async function PATCH(req : Request,{params} : {params : {staffId : string}}){
    try {
        const {salary}=await req.json()
        const {staffId}=await params
        await dbConnect()
        const updatedStaff=await UserModel.findByIdAndUpdate(
            staffId,
            {salary},
            {new : true}
        )
        if(!updatedStaff){
            return Response.json({
                success : false,
                message : "Couldn't assign salary"
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "Salary assigned successfully"
        },{status : 200})
    } catch (error) {
        console.log("Error in assigning salary",error)
        return Response.json({
            success : false,
            message : "Error in assigning salary"
        },{status : 500})
    }
}