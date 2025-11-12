import {z} from "zod"
export const signInSchema=z.object({
    email : z.email({message : "Please enter a valid email address"}),
    password : z.string().min(6,{message : "Password must be atleast 6 chars"})
})