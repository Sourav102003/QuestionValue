import { Outlet } from "react-router-dom"


import Adminheader from "./Adminheader"
import Adminfooter from "./Adminfooter"
export default function Adminmaster()
{
    return(
        <>
        <Adminheader/>
        <Outlet/>
        <Adminfooter/>
        </>
    )
}