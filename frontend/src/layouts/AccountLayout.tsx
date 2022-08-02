import { Icon } from "@iconify/react";
import { Link, Outlet } from "react-router-dom";

export const AccountLayout = () => {
    return(
        <div className="flex flex-col w-full">
            <div className="p-4 flex flex-row items-center text-primary-500">
                <Icon className="w-8 h-8" icon="ep:arrow-left-bold"/>
                <Link to="/">Go to Main Page</Link>
            </div>
            <Outlet />
        </div>
    );
}