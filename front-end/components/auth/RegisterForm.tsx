'use client'
import Link from 'next/link'
import useRegisterForm from '../hooks/useRegisterForm'

const RegisterForm = () => {
    const { form, errors, handleChange, handleSubmit } = useRegisterForm()
    return (
        <div className='flex items-center justify-center p-8'>
            <div className='container max-w-md w-full p-8 rounded-2xl shadow-[0_20px_50px_rgba(114,_110,_99,_0.7)] backdrop-blur-lg border border-red-800/50 relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-red-800/20 to-transparent rounded-2xl'></div>
                <div className="relative">
                    <h2 className='text-3xl font-extrabold text-center mb-2 tracking-tight'>S'inscrire</h2>
                    <form className='mt-8 space-y-5 perspective-1000' onSubmit={handleSubmit((data) => {
                        console.log("Inscription réussie :", data)
                        // Appelle ici ta mutation Apollo
                    })} >
                        <div className="group">
                            <input
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                type="text"
                                placeholder='name'
                                className='w-full p-4 bg-red-500/10 rounded-xl border border-red-400/50 text-black placeholder-black/50 outline-none focus:ring-1 focus:border-transparent transition-all'
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className="group">
                            <input
                                name='email'
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                                placeholder='Email'
                                className='w-full p-4 bg-red-500/10 rounded-xl border border-red-400/50 text-black placeholder-black/50 outline-none focus:ring-1 focus:border-transparent transition-all'
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="group">
                            <input
                                name='password'
                                value={form.password}
                                onChange={handleChange}
                                type="password"
                                placeholder='password'
                                className='w-full p-4 bg-red-500/10 rounded-xl border border-red-400/50 text-black placeholder-black/50 outline-none focus:ring-1 focus:border-transparent transition-all'
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div className="group">
                            <input
                                name='phone'
                                value={form.phone}
                                onChange={handleChange}
                                type="phone"
                                placeholder='+261 xx xxx xx'
                                className='w-full p-4 bg-red-500/10 rounded-xl border border-red-400/50 text-black placeholder-black/50 outline-none focus:ring-1 focus:border-transparent transition-all'
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                        <button className='group w-full p-4 mt-6 bg-gradient-to-r from-red-500 to-red-400 text-green-950 rounded-xl font-bold shadow-lg
                        hover:shadow-red-400/40 overflow-hidden transform transform-style-3d hover:-translate-y-.5 hover:scale-105 hover:translate-z-20 transition-all duration-300
                        '>
                            <span className='relative z-10 pointer-events-none'>Se connecter</span>
                            <span className='absolute inset-0 bg-gradient-t-r from-red-500 to-red-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></span>
                        </button>
                    </form>
                    <p className="mt-8 text-black-200 text-center">
                        Déjà avoir une compte?
                        <Link href="/login">
                            <span className="text-red-300 font-bold cursor-pointer hover:text-red-400 transition-colors">
                                Se connecter
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm