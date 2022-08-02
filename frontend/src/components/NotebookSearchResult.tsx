import { useState } from "react";

export const NotebookSearchResult = (data: any) => {
  const [joined, setJoined] = useState<boolean>(data.joinedByUser);

  return (
    <div className="justify-center items-center md:p-0">
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-row justify-between w-full mb-4">
          <div className="flex flex-row items-center">
            <img className="h-12 w-12 rounded-3xl" src={data.thumbnail} />
            <div className="ml-2">
              <h2 className="mr-48 text-primary-800 text-base font-medium">
                {data.name}
              </h2>
              <p className="text-primary-400 text-xs font-extralight line-clamp-2">
                {data.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between w-52 ml-5 mb-4">
          <div>
            <p className="text-primary-400 text-xs font-extralight text-right">
              {data.memberCount} Miembros
            </p>
            <button
              onClick={() => setJoined(!joined)}
              className={
                joined
                  ? "bg-primary-400/70 rounded font-semibold text-sm text-white/70 relative inline-block h-7 w-32"
                  : "bg-primary-400 rounded font-semibold text-sm text-white relative inline-block h-7 w-32"
              }
            >
              <p>{joined ? "Unido" : "Unirse"}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
