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
        <div
        className="
            min-h-screen
            flex items-center justify-center
            bg-linear-to-br from-slate-50 to-slate-100
            dark:from-slate-900 dark:to-slate-950
            px-4
        "
        >
        <div
            className="
            w-full max-w-md
            rounded-2xl
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            shadow-lg
            p-6 sm:p-8
            "
        >
            {/* Header */}
            <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Create an Account 🍽️
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                Join us and enjoy a seamless experience
            </p>
            </div>

            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >
                {/* Role */}
                <Controller
                name="role"
                control={form.control}
                rules={{ required: "Please select a role" }}
                render={({ field, fieldState }) => (
                    <div>
                    <FormLabel>Role</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                    >
                        <SelectTrigger className="w-full focus:ring-emerald-500">
                        <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Staff">Staff</SelectItem>
                        <SelectItem value="Customer">Customer</SelectItem>
                        </SelectContent>
                    </Select>

                    {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                        </p>
                    )}
                    </div>
                )}
                />

                {/* Name */}
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Your full name"
                        className="focus-visible:ring-emerald-500"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Email */}
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                        type="email"
                        placeholder="you@example.com"
                        className="focus-visible:ring-emerald-500"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Password */}
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input
                        type="password"
                        placeholder="••••••••"
                        className="focus-visible:ring-emerald-500"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* UPI (Only for Staff) */}
                {roleValue === "Staff" && (
                <FormField
                    control={form.control}
                    name="upiId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>UPI ID</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="example@upi"
                            className="focus-visible:ring-emerald-500"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                )}

                {/* Submit */}
                <Button
                type="submit"
                className="
                    w-full
                    bg-emerald-600 hover:bg-emerald-700
                    text-white
                    font-semibold
                    rounded-lg
                    py-2.5
                "
                >
                Create Account
                </Button>
            </form>
            </Form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <span className="text-emerald-600 hover:underline cursor-pointer" onClick={()=>router.push('/sign-in')}>
                Sign in
            </span>
            </p>
        </div>
        </div>
    );
}

export default SignUpPage;