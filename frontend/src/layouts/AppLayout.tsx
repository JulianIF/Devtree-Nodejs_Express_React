import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeApi";
import DevTree from "../components/DevTree";

export default function AppLayout() {

    const {data, isLoading, isError} = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        refetchOnWindowFocus: false
    })

    if(isLoading) return 'Loading...'
    if(isError) return <Navigate to={'/auth/logIn'}/>


    if (data) return <DevTree data={data}/>
}