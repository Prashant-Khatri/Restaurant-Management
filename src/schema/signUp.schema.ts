import {z} from "zod"

export const signUpSchema = z.object({
    role : z.enum(["Staff","Customer"]),
    name : z.string().min(2,{message : "Name must be atleast 2 chars"}),
    email : z.email({message : "Please enter a valid email address"}),
    password : z.string().min(6,{message : "Password must be atleast 6 chars"}),
    upiId : z.string().regex(/^[\w.\-_]{2,256}@[a-zA-Z]{2,64}$/, {
            message: "Invalid UPI ID format",
        }).optional()
})