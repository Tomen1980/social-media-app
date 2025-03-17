import {z} from "zod";

export const registerSchema = z.object({
    username : z.string().min(5,{message:"Username must be at least 5 characters"}),
    email: z.string().email({message:"Invalid email"}),
    password: z.string().min(8,{message:"Password must be at least 8 characters"}),
    confirmPassword: z.string().min(8,{message:"Password must be at least 8 characters"}),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
})

export const loginSchema = z.object({
    email: z.string().email({message:"Invalid email"}).optional(),
    usernaem: z.string().optional(),
    password: z.string(),
})

type RegisterSchema = z.infer<typeof registerSchema>;
type LoginSchema = z.infer<typeof loginSchema>;