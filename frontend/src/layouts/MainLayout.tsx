import { Outlet } from "react-router-dom";
import { BottomNavbar } from "../components/BottomNavbar";
import { TopNavbar } from "../components/TopNavbar";

export const MainLayout = () => {
    return(
        <>
            <TopNavbar/>
            <Outlet/>
            <BottomNavbar/>
        </>
    );
}