import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import placeholderPath from "../assets/images/placeholder.jpg"

export const ProfileHeader = () => {
    const { username } = useParams()
    return (
        <div className="flex flex-row justify-between px-4 sm:px-32 h-28 items-center shadow-lg shadow-primary-700/25">
            <div className="flex flex-row gap-5 items-center">
                <img src={placeholderPath} className="w-16 h-16"></img>
                <div className="text-primary-500">
                    <p className="font-semibold text-2xl ">{username}</p>
                    <p className="font-light text-sm">10 years ago</p>
                </div>
            </div>
            <div>
                <Icon className="text-primary-500 h-8 w-8" icon="ci:settings-filled"/>
            </div>
        </div>
    );
}