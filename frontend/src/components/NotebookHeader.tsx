import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { ERoles } from "../enums/ERoles";
import { formatDateAgo } from "../utils/formatDateAgo";
import { useMutation } from "@apollo/client";
import { membership } from "../graphql/mutations/membership";
import { Notebook } from "../interfaces/Entities";
import { EMembershipMutationType } from "../enums/EMutationTypes";
import { ImageInput } from "./ImageInput";
import { notebook } from "../graphql/mutations/notebook";
import { BUTTONS, NoteItButton } from "./NoteIt/Button";

interface INotebookHeaderProps {
  data: Notebook;
  isEditMode: boolean;
  submitChanges: () => void;
  setImageData: (fileData: any) => void;
  editModeToggler: () => void;
}

export const NotebookHeader = ({
  data,
  isEditMode,
  editModeToggler,
  setImageData,
  submitChanges,
}: INotebookHeaderProps) => {
  const [EditMembership, { data: _data }] = useMutation(membership);
  const [joined, setJoined] = useState<boolean>(data.joinedByUser!);

  const handleMembership = async () => {
    await EditMembership({
      variables: {
        type: joined
          ? EMembershipMutationType.LEAVE
          : EMembershipMutationType.JOIN,
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

  return (
    <div className="bg-white flex flex-col lg:flex-row justify-between items-center p-4 md:px-32 shadow-lg shadow-primary-700/25 w-full gap-5">
      <div className="flex flex-row gap-2 md:gap-10">
        {isEditMode ? (
          <ImageInput
            className="w-16 h-16"
            displayImage={data.thumbnail!}
            cb={setImageData}
          />
        ) : (
          <img src={data.thumbnail} className="w-16 h-16 rounded-full"></img>
        )}
        <div className="text-primary-500">
          <p className="font-semibold text-2xl ">{data.name}</p>
          <p className="font-light text-sm">
            {formatDateAgo(data.createdOn!)} ago
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-5">
        {!(data.role === ERoles.OWNER) && (
          <NoteItButton
            type={joined ? BUTTONS.DANGER : BUTTONS.PRIMARY}
            onClick={handleMembership}
            className={"w-28"}
          >
            {joined ? "Abandonar" : "Unirse"}
          </NoteItButton>
        )}
        {data.role === ERoles.OWNER &&
          (isEditMode ? (
            <>
              <NoteItButton
                type={BUTTONS.PRIMARY}
                onClick={submitChanges}
                className={"w-28"}
              >
                Guardar
              </NoteItButton>
              <NoteItButton
                type={BUTTONS.DANGER}
                onClick={editModeToggler}
                className={"w-28"}
              >
                Cancelar
              </NoteItButton>
            </>
          ) : (
            <button onClick={editModeToggler}>
              <Icon
                className="w-10 h-10 text-primary-500"
                icon="ant-design:edit-filled"
              ></Icon>
            </button>
          ))}
      </div>
    </div>
  );
};
