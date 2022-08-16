import { Icon } from "@iconify/react";
import { useState } from "react";
import placeholderPath from "../assets/images/placeholder.jpg"
import { DropdownNotebook } from "./DropdownNotebook";

export const UserDisplay = ({ role }: {role: string}) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <li className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
            <img src={placeholderPath} className="w-10 h-10 rounded-full"></img>
            <div>
                <p className="font-semibold">User-Moder</p>
                <p className="font-light text-sm">u/User-Moder</p>
            </div>
            { role === "Owner" && <Icon className="w-5 h-5 text-primary-600" icon="bxs:crown" />}
            { role === "Mod" && <Icon className="w-5 h-5 text-primary-600" icon="jam:hammer-f" />}
        </div>
        <div>
            <button onClick={toggleDropdown}><Icon className="opcion" icon="simple-line-icons:options-vertical" /></button>
            {
                showDropdown && (<DropdownNotebook role={role}/>)
            }
        </div>
    </li>
    );
}