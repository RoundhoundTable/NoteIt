import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BottomNavbar } from "../components/BottomNavbar";
import { TopNavbar } from "../components/TopNavbar";

export const MainLayout = () => {
    const [width, setWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth))
        return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
    });

    return(
        <div className="flex flex-col h-screen">
            <TopNavbar/>
            <div className="h-full">
                <Outlet />
            </div>
            {width <= 767 && <BottomNavbar/>}
        </div>
    );
}