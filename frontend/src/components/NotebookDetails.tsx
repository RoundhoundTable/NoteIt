import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { members } from "../graphql/queries/members";
import { Notebook } from "../interfaces/Entities";
import { UserDisplay } from "./UserDisplay";

interface INotebookDetails {
  data: Notebook;
  isEditMode: boolean;
  description: string;
  setDescription: (description: string) => void;
}

export const NotebookDetails = ({
  data,
  isEditMode,
  description,
  setDescription,
}: INotebookDetails) => {
  const { data: _members } = useQuery(members, {
    variables: {
      notebook: data.name,
    },
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="bg-primary-600 text-white p-5 h-max md:w-96 md:mt-5">
      <div className="border-b-2 border-primary-800 pb-2">
        <p className="font-semibold">Descripcion:</p>
        {isEditMode ? (
          <textarea
            value={description}
            onChange={(ev: any) => setDescription(ev.target.value)}
            className="border-2 border-white bg-primary-600 w-full md:w-80 rounded h-32 overflow-hidden resize-none focus:outline-none"
          ></textarea>
        ) : (
          <p className="text-sm break-all line-clamp-[5]">{data.description}</p>
        )}
      </div>
      <button
        className="py-2 max-w-lg flex flex-row items-center gap-2"
        onClick={toggleModal}
      >
        <Icon className="h-8 w-8 text-white" icon="bxs:user" />
        Usuarios: {data.members}
      </button>
      {showModal && (
        <div className="text-black w-screen h-screen fixed top-0 left-0 grid items-center justify-items-center z-10 bg-primary-200/10 backdrop-blur-[2px]">
          <div className="bg-white w-4/5 md:w-1/3 rounded border-2 border-primary-500 max-h-[55vh] overflow-auto">
            <div className="flex flex-col sticky top-0">
              <button
                className="flex flex-row justify-end m-2"
                onClick={toggleModal}
              >
                <Icon
                  className="h-6 w-6 text-red-600"
                  icon="akar-icons:circle-x"
                />
              </button>
            </div>
            <div className="flex flex-col px-8 pb-4">
              <p className="text-base text-primary-700 border-b-2 border-primary-700">
                Lista de miembros:
              </p>
              <ul className="flex flex-col gap-5 p-2 text-xl md:text-base">
                {_members &&
                  _members.members.map((element: any, key: number) => {
                    return (
                      <UserDisplay
                        key={key}
                        user={element.user}
                        notebook={data}
                        role={element.role}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
