import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginView from "./views/loginView"
import RegisterView from "./views/RegisterView"

export default function Router()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/auth/logIn" element ={< LoginView />} />
                    <Route path="/auth/register" element ={< RegisterView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}