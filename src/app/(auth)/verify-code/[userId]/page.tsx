"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { verifycodeSchema } from "@/schema/verify-code.schema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {z} from "zod"

function VerifyCodePage(){
    const params=useParams()
    console.log(params)
    const userId=params.userId
    console.log(userId)
    const form=useForm({
        resolver : zodResolver(verifycodeSchema)
    })
    const router=useRouter()
    const onSubmit=async (data : z.infer<typeof verifycodeSchema>)=>{
        console.log(data)
        try {
            const response=await axios.post('/api/verify-code',{
                verificationCode : data.verificationCode,
                userId
            })
            if(!response){
                toast.error("Couldn't Verify Code Please try again")
                return;
            }
            toast.success("verification-Code verified successfully")
            router.push('/dashboard')
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>
            console.log(axiosError.response?.data.message)
            toast.error(axiosError.response?.data.message || "Error in verification of code")
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Verification-Code</FormLabel>
                    <FormControl>
                        <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                    <FormDescription>
                        Please enter the Verification-Code sent to your email.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default VerifyCodePage;