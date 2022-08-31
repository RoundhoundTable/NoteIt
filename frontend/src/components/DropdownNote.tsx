import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const DropdownNoteOptions = ({ noteId }: { noteId: string }) => {
  return (
    <>
      <li>
        <Link
          to={`/n/edit/${noteId}`}
          className="p-2 font-semibold flex flex-row gap-2 items-center w-full hover:bg-gray-200"
        >
          <Icon
            className="w-5 h-5 text-primary-500"
            icon="ant-design:edit-filled"
          ></Icon>
          <p>Edit</p>
        </Link>
      </li>
      <li>
        <button className="p-2 font-semibold text-danger-500 flex flex-row gap-2 items-center w-full hover:bg-gray-200">
          <Icon className="w-5 h-5 text-danger-500" icon="bi:trash-fill" />
          <p>Delete</p>
        </button>
      </li>
    </>
  );
};
