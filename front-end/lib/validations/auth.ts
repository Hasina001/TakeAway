import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email({ message: 'Email invalide' }),
    password: z.string().min(6, { message: "Mot de passe doit contenir au moins 6 caractères" })
})

export const signupSchema = z.object({
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: 'Email invalide' }),
    password: z.string().min(6, { message: "Mot de passe doit contenir au moins 6 caractères" }),
    phone: z.string().regex(/^\+261\d{9}$/, { message: "Numéro de téléphone invalide" })
})