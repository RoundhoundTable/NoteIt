import { INotebookResult } from "../services/GetMockSearchResults";
import { useState } from "react";

export const NotebookSearchbarResult = (data: INotebookResult) => {
  const [joined, setJoined] = useState<boolean>(data.joinedByUser);

  return (
    <li className="flex flex-row justify-between w-full p-2 items-center">
      <div className="flex flex-row items-center">
        <img className="h-12 w-12 rounded-3xl" src={data.thumbnail} />
        <div>
          <h2 className="ml-2 text-primary-800 text-sm font-medium">
            {data.name}
          </h2>
        </div>
      </div>
      <button
        onClick={() => setJoined(!joined)}
        className={
          joined
            ? "bg-primary-400/70 rounded font-semibold text-xs text-white/70 relative inline-block h-7 w-16"
            : "bg-primary-400 rounded font-semibold text-xs text-white relative inline-block h-7 w-16"
        }
      >
        <p>{joined ? "Unido" : "Unirse"}</p>
      </button>
    </li>
  );
};
