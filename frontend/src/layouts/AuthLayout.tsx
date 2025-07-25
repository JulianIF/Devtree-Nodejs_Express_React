import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import Logo from "../components/Logo"

export default function AuthLayout()
{
    return (
        <>
            <div className= ' bg-slate-800 min-h-screen'>
                <Logo/>
                <div className=" py-10">
                    <Outlet/>
                </div>
            </div>
            <Toaster/>
        </>
    )
}