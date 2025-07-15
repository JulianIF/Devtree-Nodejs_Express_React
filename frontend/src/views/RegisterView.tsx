import { NavLink, Link } from "react-router-dom"

export default function RegisterView()
{
    return (
        <>
            <div>RegisterView</div>

            <nav>
                <Link to="/auth/logIn">
                    Log in here
                </Link>
            </nav>
        </>
    )
}