import { User } from "../interfaces/Entities";
import { formatDateAgo } from "../utils/formatDateAgo";

export const ProfileHeader = (user: User) => {
  return (
    <div className="bg-white flex flex-row gap-5 items-center px-4 sm:px-32 h-28 shadow-lg shadow-primary-700/25 w-full">
      <img src={user.thumbnail} className="w-16 h-16 rounded-full"></img>
      <div className="text-primary-500">
        <p className="font-semibold text-2xl ">{user.displayName}</p>
        <p className="font-light text-sm">
          {formatDateAgo(user.createdOn)} ago
        </p>
      </div>
    </div>
  );
};
