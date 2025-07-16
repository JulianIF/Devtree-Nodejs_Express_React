import { NavLink, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import type { LogInForm } from "../types"
import { toast } from "sonner"
import api from "../config/axios"
import {isAxiosError} from "axios"

export default function LoginView()
{
    const initialValues : LogInForm =
        {
            email: '',
            password: ''
        }
        const{ register, handleSubmit, formState: { errors }} = useForm({defaultValues : initialValues})

        const handleLogin = async (formData:LogInForm) =>
        {
            try 
            {
                const {data} = await api.post('/auth/logIn', formData)
                localStorage.setItem('AUTH_TOKEN', data)
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
        <h1 className=" text-4xl text-white font-bold">Log In</h1>

        <form 
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
    >
        <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
            <input
                id="email"
                type="email"
                placeholder="Email"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                {...register("email", {
                    required: "Email required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                    },
                })}
            />
            {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
            <input
                id="password"
                type="password"
                placeholder="Password"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                {...register("password", {
                    required: "Password required",
                })}
            />
            {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
        </div>

        <input
            type="submit"
            className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
            value='Log In'
        />
        </form>

        <nav className=" my-10">
            <Link className=" text-center text-white text-lg block"
            to="/auth/register">
                Create an account here!
            </Link>
        </nav>
        </>
    )
}