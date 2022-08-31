import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { EMembershipMutationType } from "../../enums/EMutationTypes";
import { ERoles } from "../../enums/ERoles";
import { membership } from "../../graphql/mutations/membership";
import { Notebook } from "../../interfaces/Entities";

interface INotebookResultProps {
  data: Notebook;
  isBar?: boolean;
}

export const NotebookResult = ({ data, isBar }: INotebookResultProps) => {
  const [EditMembership, { data: _data }] = useMutation(membership);
  const [joined, setJoined] = useState<boolean>(data.joinedByUser!);

  const onClick = async (type: EMembershipMutationType) => {
    await EditMembership({
      variables: {
        type,
        payload: {
          notebookName: data.name,
        },
      },
    });
  };

  useEffect(() => {
    if (_data?.membership.left) {
      setJoined(false);
    }
    if (_data?.membership.joined) {
      setJoined(true);
    }
  }, [_data]);

  return isBar ? (
    <li className="flex flex-row justify-between w-full p-2 items-center">
      <div>
        <a
          className="flex flex-row items-center"
          href={`/nb/${encodeURIComponent(data.name!)}`}
        >
          <img className="h-12 w-12 rounded-3xl" src={data.thumbnail} />
          <div>
            <h2 className="ml-2 text-primary-800 text-sm font-medium">
              {data.name}
            </h2>
          </div>
        </a>
      </div>
      {data.role !== ERoles.OWNER && (
        <button
          onClick={() =>
            onClick(
              joined
                ? EMembershipMutationType.LEAVE
                : EMembershipMutationType.JOIN
            )
          }
          className={
            joined
              ? "bg-primary-400/70 rounded font-semibold text-xs text-white/70 relative inline-block h-7 w-16"
              : "bg-primary-400 rounded font-semibold text-xs text-white relative inline-block h-7 w-16"
          }
        >
          {joined ? "Unido" : "Unirse"}
        </button>
      )}
    </li>
  ) : (
    <a
      className="flex flex-row items-center my-2"
      href={`/nb/${encodeURIComponent(data.name!)}`}
    >
      <img
        src={data.thumbnail}
        className="h-12 w-12 aspect-square rounded-full"
      />
      <div className="flex flex-col w-full ml-2">
        <p className="text-primary-800 text-base font-medium">{data.name}</p>
        <div className="hidden md:block">
          <p className="text-primary-400 text-xs font-extralight line-clamp-2">
            {data.description}
          </p>
        </div>
        <p className="text-primary-400 text-xs font-extralight text-right block md:hidden">
          {data.members} Miembros
        </p>
      </div>
      <div className="flex flex-col">
        <p className="text-primary-400 text-xs font-extralight text-right hidden md:block">
          {data.members} Miembros
        </p>
        {data.role !== ERoles.OWNER && (
          <button
            onClick={() =>
              onClick(
                joined
                  ? EMembershipMutationType.LEAVE
                  : EMembershipMutationType.JOIN
              )
            }
            className={`${
              joined
                ? "bg-primary-400/70 text-white/70"
                : "bg-primary-400 text-white"
            } rounded font-semibold text-sm w-20 h-7`}
          >
            {joined ? "Unido" : "Unirse"}
          </button>
        )}
      </div>
    </a>
  );
};
