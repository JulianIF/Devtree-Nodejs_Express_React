import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginView from "./views/LoginView"
import RegisterView from "./views/RegisterView"
import AuthLayout from "./layouts/AuthLayout"
import AppLayout from "./layouts/AppLayout"
import ProfileView from "./views/ProfileView"
import LinkTreeView from "./views/LinkTreeView"
import HandleView from "./views/HandleView"
import NotFoundView from "./views/NotFoundVIew"
import HomeView from "./views/HomeView"

export default function Router()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route element ={<AuthLayout/>}>
                    <Route path="/auth/logIn" element ={< LoginView />} />
                    <Route path="/auth/register" element ={< RegisterView />} />
                </Route>

                <Route path="/admin" element={<AppLayout/>}>
                    <Route index ={true} element={<LinkTreeView/>}/>
                    <Route path="profile" element={<ProfileView/>}/>
                
                </Route>

                <Route path="/:handle" element={<AuthLayout/>}>
                    <Route index ={true} element={<HandleView/>}/>
                </Route>

                <Route path="/404" element={<AuthLayout/>}>
                    <Route index ={true} element={<NotFoundView/>}/>
                </Route>
                <Route path="/" element={<HomeView/>}/>
            </Routes>
        </BrowserRouter>
    )
}