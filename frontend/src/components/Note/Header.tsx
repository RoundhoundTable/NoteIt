import { Icon } from "@iconify/react";
import { PropsWithChildren, useContext } from "react";
import { AuthContext, useAuth } from "../../context/AuthProvider";
import { NoteContext } from "./context";

export const Header = (props: PropsWithChildren<any>) => {
  const noteContext = useContext(NoteContext);
  const { currentUser } = useAuth() as AuthContext;

  return (
    <div className="flex flex-row justify-between w-xl mb-4">
      <div className="flex flex-row items-center">{props.children}</div>
      {currentUser && noteContext?.isOwner ? (
        <Icon
          className="opcion"
          icon="simple-line-icons:options-vertical"
          onClick={props.toggleDropdown}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
