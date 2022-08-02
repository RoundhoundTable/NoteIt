import { useParams } from "react-router-dom";
import placeholderPath from "../assets/images/placeholder.jpg"

export const ProfileHeader = () => {
    const { username } = useParams()
    return (
        <div className="bg-white flex flex-row gap-5 items-center px-4 sm:px-32 h-28 shadow-lg shadow-primary-700/25 w-full">
            <img src={placeholderPath} className="w-16 h-16 rounded-full"></img>
            <div className="text-primary-500">
                <p className="font-semibold text-2xl ">{username}</p>
                <p className="font-light text-sm">10 years ago</p>
            </div>
        </div>
    );
}