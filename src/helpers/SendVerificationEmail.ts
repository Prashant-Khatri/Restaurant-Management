import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
async function SendVerificationEmail(name : string,email : string,otp : string){
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'OTP for Sign-Up for Restaurant-Management-System',
            react: VerificationEmail(name,otp),
        })
        return Response.json({
            success : true,
            message : "Verification email sent successfully"
        },{status : 200})
    } catch (error) {
        console.log("Error in sending email",error)
        return Response.json({
            success : false,
            message : "Error in sending verification email"
        },{status : 500})
    }
}

export default SendVerificationEmail