import { signupSchema } from "@/lib/validations/auth";
import { z } from "zod";
import { useState } from "react";

// Définir les champs attendus
type RegisterFormData = {
    name: string
    email: string
    password: string
    phone: string
}


const useRegisterForm = () => {
    const [form, setForm] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        phone: ''
    })

    const [errors, setErrors] = useState<Partial<RegisterFormData>>({})

    // Mise à jour du champ modifié
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    // Soumission du formulaire
    const handleSubmit = (onSuccess: (data: RegisterFormData) => void) => (e: React.FormEvent) => {
        e.preventDefault()
        const result = signupSchema.safeParse(form)

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors
            setErrors({
                name: fieldErrors.name?.[0],
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
                phone: fieldErrors.phone?.[0]
            })
            return
        }
        setErrors({})  // aucune erreur : on efface les anciennes
        onSuccess(result.data) // déclenche la suite (ex : appel Apollo)
    }
    return { form, errors, handleChange, handleSubmit }
}

export default useRegisterForm