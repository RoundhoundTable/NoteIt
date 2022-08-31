import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ERoles } from "../enums/ERoles";
import { Notebook, User } from "../interfaces/Entities";
import { DropdownMenu } from "./DropdownMenu";
import { UserManagerDropdown } from "./UserManagerDropdown";

interface UserDisplayProps {
  user: User;
  role: ERoles;
  notebook: Notebook;
}

export const UserDisplay = ({ user, role, notebook }: UserDisplayProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownHandler = (event: any) => {
    setShowDropdown(!showDropdown);
    event.stopPropagation();
  };

  return (
    <li className="flex flex-row justify-between">
      <Link to={`/u/${user.username}`}>
        <div className="flex flex-row items-center gap-2">
          <img src={user.thumbnail} className="w-10 h-10 rounded-full"></img>
          <div>
            <p className="font-semibold">{user.displayName}</p>
            <p className="font-light text-sm">u/{user.username}</p>
          </div>
          {role === ERoles.OWNER && (
            <Icon className="w-5 h-5 text-yellow-600" icon="bxs:crown" />
          )}
          {role === ERoles.MODERATOR && (
            <Icon className="w-5 h-5 text-primary-600" icon="jam:hammer-f" />
          )}
        </div>
      </Link>
      <div>
        {(notebook.role === ERoles.OWNER ||
          (notebook.role === ERoles.MODERATOR && role === ERoles.USER)) &&
          role !== ERoles.OWNER && (
            <button onClick={dropdownHandler}>
              <Icon icon="simple-line-icons:options-vertical" />
            </button>
          )}
        {showDropdown && (
          <DropdownMenu togglerFunc={setShowDropdown}>
            <UserManagerDropdown
              notebook={notebook}
              user={user}
              userRole={role}
            />
          </DropdownMenu>
        )}
      </div>
    </li>
  );
};
