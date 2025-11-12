"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { signUpSchema } from "@/schema/signUp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
import z from "zod";

type DataType={
    role : string,
    name : string;
    email : string;
    password : string;
    upiId? : string
}

function SignUpPage(){
    const form=useForm({
        resolver : zodResolver(signUpSchema)
    })
    const {watch}=form;
    const roleValue=watch('role')
    const router=useRouter()
    const onSubmit=async (data : z.infer<typeof signUpSchema>)=>{
        try {
            console.log(data)
            const response=await axios.post('/api/sign-up',{data})
            if(!response){
                toast.error("Enable to signup please try again")
                return;
            }
            toast.success("Verfication Code sent to your email")
            const userId=response.data.user._id
            console.log(userId)
            router.push(`/verify-code/${userId}`)
        } catch (error) {
            const axiosError=error as AxiosError<ApiResponse>;
            console.log(axiosError.response?.data)
            toast.error(axiosError.response?.data.message || "Error in sign-up")
        }
    }
    return (
        <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Controller
                    name="role"
                    control={form.control}
                    rules={{ required: "Please select a theme" }}
                    render={({ field, fieldState }) => (
                    <div>
                        <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Staff">Staff</SelectItem>
                            <SelectItem value="Customer">Customer</SelectItem>
                        </SelectContent>
                        </Select>
                        {fieldState.error && (
                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                        )}
                    </div>
                    )}
                />
                <FormField
                control={form.control}
                name="name"
                render={({ field ,fieldState}) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your name here" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field ,fieldState}) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your email here" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field ,fieldState}) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your password here" {...field} type="password"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                {
                    roleValue==="Staff" &&
                    <FormField
                        control={form.control}
                        name="upiId"
                        render={({ field ,fieldState}) => (
                            <FormItem>
                            <FormLabel>Upi Id</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your UpiId here" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                }
                <Button type="submit">Submit</Button>
            </form>
            </Form>
        </div>
    );
}

export default SignUpPage;