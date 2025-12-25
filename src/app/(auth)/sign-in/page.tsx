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
    const form=useForm<z.infer<typeof signInSchema>>({
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
        <div className="
        min-h-screen
        flex items-center justify-center
        bg-linear-to-br from-slate-50 to-slate-100
        dark:from-slate-900 dark:to-slate-950
        px-4
        ">
        <div className="
            w-full max-w-md
            rounded-2xl
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            shadow-lg
            p-6 sm:p-8
        ">
            {/* Header */}
            <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Welcome Back 👋
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                Sign in to continue
            </p>
            </div>

            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >
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
                Sign In
                </Button>
            </form>
            </Form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <span className="text-emerald-600 hover:underline cursor-pointer" onClick={()=>router.push('/sign-up')}>
                Sign up
            </span>
            </p>
        </div>
        </div>
    );
}

export default SignInPage;