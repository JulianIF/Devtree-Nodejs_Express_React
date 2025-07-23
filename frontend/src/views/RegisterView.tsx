import { NavLink, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import type { RegisterForm } from "../types"
import ErrorMessage from "../components/ErrorMessage"
import api from "../config/axios"
import {isAxiosError} from "axios"
import { toast } from "sonner"

export default function RegisterView()
{
    const initialValues =
    {
        name: '',
        email: '',
        handle: '',
        password: '',
        password_confirmation: ''
    }
    const{ register, watch, reset, handleSubmit, formState: { errors }} = useForm<RegisterForm>({defaultValues : initialValues})

    const password = watch('password')
    const handleRegister = async (formData: RegisterForm) =>
    {
        try 
        {
            const {data} = await api.post('/auth/register', formData)
            toast.success(data)

            reset()
        } 
        catch (error) 
        {
            if (isAxiosError(error))
            {
                toast.error(error.response?.data.error)
                console.log(error.response?.data.error)
            }
        }
    }
    return (
        <>
            <h1 className=" text-4xl text-white font-bold">Create Account</h1>

            <form 
            onSubmit={handleSubmit(handleRegister)}
            className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="name" className="text-2xl text-slate-500">Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register('name', {
                        required: "Name required"
                    })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email for registry"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register('email', {
                        required: "Email required",
                        pattern: 
                        {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid Email",
                        }
                    })}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                <input
                    id="handle"
                    type="text"
                    placeholder="Username: no spaces allowed"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register('handle', {
                        required: "Username required"
                    })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register('password', {
                        required: "Password required",
                        minLength: 
                        {
                            value: 8,
                            message: "Password must be at least 8 characters long"
                        }
                    })}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repeat Password</label>
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repeat Password"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register('password_confirmation', {
                        required: "Password confirmation required",
                        validate: (value) => value === password || "Does not match password"
                    })}
                />
                {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-black rounded-lg font-bold cursor-pointer"
                value='Create Account'
            />  
            </form>

            <nav className=" my-10">
                <Link className=" text-center text-white text-lg block"
                to="/auth/logIn">
                    Log in here
                </Link>
            </nav>
        </>
    )
}