import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EMembershipMutationType } from "../enums/EMutationTypes";
import { ERoles } from "../enums/ERoles";
import { membership } from "../graphql/mutations/membership";
import { user } from "../graphql/mutations/user";
import { Notebook, User } from "../interfaces/Entities";

export const UserManagerDropdown = ({
  user,
  userRole,
  notebook,
}: {
  user: User;
  userRole: ERoles;
  notebook: Notebook;
}) => {
  const [Membership, { data }] = useMutation(membership);
  const navigateTo = useNavigate();

  const editUser = (type: EMembershipMutationType, role?: ERoles) => {
    Membership({
      variables: {
        type: type,
        payload: {
          username: user.username,
          notebookName: notebook.name,
          role: role ?? undefined,
        },
      },
    });
  };

  useEffect(() => {
    if (data) navigateTo(0);
  }, [data]);

  return (
    <>
      {notebook.role === ERoles.OWNER &&
        (userRole !== ERoles.MODERATOR ? (
          <li>
            <button
              className="p-2 font-semibold flex flex-row gap-1 justify-center items-center w-full"
              onClick={() =>
                editUser(EMembershipMutationType.EDIT, ERoles.MODERATOR)
              }
            >
              <Icon className="w-5 h-5" icon="ic:baseline-add-moderator" />
              <p>Hacer Moderador</p>
            </button>
          </li>
        ) : (
          <li>
            <button
              className="p-2 font-semibold flex flex-row gap-1 justify-center items-center w-full"
              onClick={() =>
                editUser(EMembershipMutationType.EDIT, ERoles.USER)
              }
            >
              <Icon className="w-5 h-5" icon="ic:baseline-remove-moderator" />
              <p>Quitar Moderador</p>
            </button>
          </li>
        ))}
      {(notebook.role === ERoles.OWNER || notebook.role === ERoles.MODERATOR) &&
        userRole === ERoles.USER && (
          <li>
            <button
              className="p-2 font-semibold text-danger-500 flex flex-row gap-1 justify-center items-center w-full"
              onClick={() => editUser(EMembershipMutationType.KICK)}
            >
              Kick
            </button>
          </li>
        )}
      {notebook.role === ERoles.OWNER && userRole === ERoles.MODERATOR && (
        <li>
          <button
            className="p-2 font-semibold text-danger-500 flex flex-row gap-1 justify-center items-center w-full"
            onClick={() => editUser(EMembershipMutationType.KICK)}
          >
            Kick
          </button>
        </li>
      )}
    </>
  );
};
