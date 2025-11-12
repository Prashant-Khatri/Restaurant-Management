"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schema/signIn.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {email, z} from "zod"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignInPage(){
    const form=useForm({
        resolver : zodResolver(signInSchema)
    })
    const router=useRouter()
    const onSubmit=async (data : z.infer<typeof signInSchema>)=>{
        const result=await signIn('credentials',{
            redirect : false,
            email : data.email,
            password : data.password
        })
        if(result?.error){
            toast.error('Incorrect email or password')
        }
        if(result?.url){
            router.push('/dashboard')
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
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
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your password here" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default SignInPage;