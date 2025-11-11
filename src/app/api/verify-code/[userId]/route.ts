import UserModel from "@/models/User.models"

export async function POST(req : Request,{params} : {params : {userId : string}}){
    try {
        const {verificationCode}=await req.json()
        const {userId}=await params

        const user=await UserModel.findById(userId)
        if(!user){
            return Response.json({
                success : false,
                message : "Couldn't find user"
            },{status : 401})
        }
        const isVerificationCodeCorrect=user.otp===verificationCode
        if(!isVerificationCodeCorrect){
            return Response.json({
                success : false,
                message : "Incorrect verification code"
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "Verification successfull"
        },{status : 200})
    } catch (error) {
        console.log("Error in verification of code",error)
        return Response.json({
            success : false,
            message : "Error in verification of code"
        },{status : 500})   
    }
}