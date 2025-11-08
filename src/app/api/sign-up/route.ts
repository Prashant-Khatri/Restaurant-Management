import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.models";
import bcrypt from "bcrypt"

export async function POST(req : Request){
    const {role,name,email,password,upiId}=await req.json();
    const otp : string = Math.floor(100000+Math.random()*900000).toString();
    try {
        await dbConnect();
        const existingUserByEmail=await UserModel.findOne({email});
        if(existingUserByEmail){
            return Response.json({
                success : false,
                message : "User already registered with this email"
            },{status : 401})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new UserModel({
            role,
            name,
            email,
            password : hashedPassword,
            otp
        })
        if(upiId){
            newUser.upiId=upiId
        }
        const savedUser=await newUser.save();
        if(!savedUser){
            return Response.json({
                success : false,
                message : "Couldn't save user"
            },{status : 401})
        }
        await SendVerificationEmail({otp})
        return Response.json({
            success : true,
            message : "User save successfully",
            user : savedUser
        },{status : 200})
    } catch (error) {
        console.log('Error in sign-up',error);
        return Response.json({
            success : false,
            message : "Error in sign-up of user"
        },{status : 500})
    }
}