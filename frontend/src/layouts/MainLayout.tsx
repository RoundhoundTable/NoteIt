import { Outlet } from "react-router-dom";
import { BottomNavbar } from "../components/BottomNavbar";
import { TopNavbar } from "../components/TopNavbar";

export const MainLayout = () => {
    return(
        <div className="flex flex-col w-full">
            <TopNavbar/>
            <Outlet />
            <BottomNavbar/>
        </div>
    );
}