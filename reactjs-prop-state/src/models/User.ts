import {z} from "zod"

export const BasicUserSchema = z.object({
    name: z
     .string().trim()
     .min(2, {message: "Name has to be at least 2 characters"}),
    username: z
     .string().trim().toLowerCase()
     .min(4, {message: "Email must be at  4 or more characters long"}),
    email: z.string().email().trim().toLowerCase(),
    phone: z
     .string()
     .min(10, {message: "Phone number must be at least 10 characters long"}),
    website: z.string().trim().toLowerCase()
     .min(5, {message: "Website must be at least 5 characters long"})
     .refine(val => val.indexOf(".") !== -1, {message: "Invalid URl"})
     .optional(),
    company: z.object({
        name: z.string().trim()
          .min(5, {message: "Company must be at least 5 characters long"}),
        catchPhrase: z.string().optional(),
    })
})