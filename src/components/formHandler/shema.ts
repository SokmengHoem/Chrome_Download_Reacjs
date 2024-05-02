import {z} from "zod"

export const registartionSchema = z.object({
    name: z.string().min(2, {message: "Name has to be at least 2 characters"}),
    email: z.string().email({message: "Not a valid email address"}),
    password: z.string().min(8, {message: "Password has to be at least 8 characters"}),
    confirmPassword: z.string().min(8, {message: "Password has to be at least 8 characters"}),
    birthday: z.string().transform((value) => new Date(value)),
    gender: z.string({
        errorMap:() => {
            return {message: "Please select a gender"};
        }
    }),
    termsAndConditions: z.boolean(),
});

export type RegistractionSchema = z.infer<typeof registartionSchema>;