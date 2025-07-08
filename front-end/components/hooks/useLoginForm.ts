import { use, useState } from 'react'
import { loginSchema } from './../../lib/validations/auth'

type loginFormData = {
  email: string
  password: string
}

const useLoginForm = () => {
  const [form, setForm] = useState<loginFormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<loginFormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (onSuccess: (data: loginFormData) => void) => (e: React.FormEvent) => {
    e.preventDefault()
    const result = loginSchema.safeParse(form)

    setErrors({
      email: result.success ? '' : result.error?.formErrors.fieldErrors.email?.[0] ?? '',
      password: result.success ? '' : result.error?.formErrors.fieldErrors.password?.[0] ?? ''
    })

    if(result.success) {
      onSuccess(result.data)
    }
  }

  return { form, errors, handleChange, handleSubmit }
}

export default useLoginForm