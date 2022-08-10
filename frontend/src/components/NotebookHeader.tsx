import { useState } from "react";
import { useParams } from "react-router-dom";
import placeholderPath from "../assets/images/placeholder.jpg"
import { Icon } from "@iconify/react";
import { useField } from "../hooks/useField";

interface INotebookHeaderProps {
    isEditMode: boolean;
    editModeToggler: () => void;
}

export const NotebookHeader = ({ isEditMode, editModeToggler }: INotebookHeaderProps) => {
    const name = useField({ type: "text"})
    const { notebookid } = useParams()
    const [ joined, setJoined ] = useState<boolean>(false)
    return (
        <div className="bg-white flex flex-col lg:flex-row justify-between items-center p-4 md:px-32 shadow-lg shadow-primary-700/25 w-full gap-5">
            <div className="flex flex-row gap-2 md:gap-10">
                <img src={placeholderPath} className="w-16 h-16 rounded-full"></img>
                <div className="text-primary-500">
                    { isEditMode ? <input {...name} className="font-semibold text-primary-500 px-3 h-11 focus:outline-none rounded border-2 border-primary-500"/>:<p className="font-semibold text-2xl ">{ notebookid }</p>}
                    <p className="font-light text-sm">20 years ago</p>
                </div>
            </div>
            <div className="flex flex-row gap-5">
                <button onClick={() => setJoined (!joined)} className={
                    joined
                    ? "bg-primary-500 p-1 h-10 border-2 border-blue-400 hover:bg-primary-600 rounded text-white"
                    : "bg-primary p-1 h-10 border-2 border-danger-400 hover:bg-danger-600 hover:text-white rounded text-red-600"
                }>
                    {joined ? "Unirse" : "Abandonar"}
                </button>
                {isEditMode? 
                    <><button className="bg-primary-500 px-4 h-10 border-2 border-blue-400 hover:bg-primary-600 rounded text-white">Guardar</button>
                    <button onClick={editModeToggler} className="bg-primary p-1 h-10 border-2 border-danger-400 hover:bg-danger-600 hover:text-white rounded text-red-600">Cancelar</button></>:

                    <button onClick={editModeToggler}>
                        <Icon className="w-10 h-10 text-primary-500" icon="ant-design:edit-filled"></Icon>
                    </button>
                }
            </div>
        </div>
    )
}