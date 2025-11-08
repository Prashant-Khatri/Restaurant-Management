import dbConnect from "@/lib/dbConnect"
import UserModel from "@/models/User.models"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOptions : NextAuthOptions={
    providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            email: { label: "Email", type: "text", placeholder: "youremail@mail.com" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if(!credentials || !credentials.email || !credentials.password){
                throw new Error("All field are required")
            }
            await dbConnect()
                try {
                    const user=await UserModel.findOne({email : credentials.email})
                    if(!user){
                        throw new Error("No user found with this email")
                    }
                    const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error("Incorrect password")
                    }
                } catch (error) {
                    console.log("Error in authorization")
                    throw new Error("Authorization Failed")
                }
            }
        })
    ],
    callbacks : {
        async jwt({token,user}){
            if(user){
                token._id=user._id?.toString()
                token.role=user.role;
                token.email=user.email;
                token.name=user.name
            }
            return token
        },
        async session({session,token}){
            if(token){
                session.user._id=token._id
                session.user.role=token.role;
                session.user.email=token.email;
                session.user.name=token.name
            }
            return session
        }
    },
    pages : {
        signIn : '/sign-in'
    },
    session : {
        strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET
}