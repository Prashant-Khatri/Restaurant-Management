import {z} from "zod"

export const verifycodeSchema=z.object({
    verificationCode : z.string().regex(/^[0-9]{6}$/, "Must be exactly 6 digits")
})