import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const DropdownMenu = () => {
    return (
        <div className="relative w-full">
            <ul className="z-10 absolute right-0 bottom-0 md:bottom-auto w-52 bg-white my-3 rounded shadow-xl shadow-primary-500/30 text-center text-primary-500">
                <Link to="/u/:username">
                    <li>
                        <button className="p-2 font-semibold flex flex-row gap-1 justify-center items-center w-full"><Icon className="w-6 h-6" icon="bxs:user-circle"/>Perfil</button>
                    </li>
                </Link>
                <Link to="/account/settings">
                    <li>
                        <button className="p-2 font-semibold flex flex-row gap-1 justify-center items-center w-full"><Icon className="w-6 h-6" icon="fa6-solid:gear"/>Configuracion</button>
                    </li>
                </Link>
                <li>
                <button className="p-2 font-semibold text-danger-500 flex flex-row gap-1 justify-center items-center w-full"><Icon className="w-6 h-6" icon="material-symbols:logout-rounded"/>Cerrar sesión</button>
                </li>
            </ul>
        </div>
    );
}