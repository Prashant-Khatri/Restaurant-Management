import UserModel from "@/models/User.models"

export async function PATCH(req : Request,{params} : {params : {staffId : string}}){
    try {
        const {staffId}=await params
        const res=await UserModel.findByIdAndUpdate(
            staffId,
            {lastPayment : new Date()},
            {new : true}
        )
        if(!res){
            return Response.json({
                success : false,
                message : "Couldn't update the lastPayment date"
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "lastPayment date upadted successfully"
        },{status : 200})
    } catch (error) {
        console.log("Error in updating last payment date",error)
        return Response.json({
            success : false,
            message : "Error in updating last payment date"
        },{status : 500})
    }
}