import { Link } from "react-router-dom";


export default function Logo()
{
    return(
        <div className="w-full p-5 lg:p-0 md:w-1/3">
            <Link to={"/"}>
                <img src="/logo.svg" className="w-full block" alt = "Devtree Logo"/>
            </Link>
        </div>
    )
}