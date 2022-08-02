import { Icon } from "@iconify/react";

export const CommentForm = () => {
    return (
        <div className="border-b-2">
            <div className="flex flex-row w-full mb-4 items-end">
                <Icon className="h-12 w-12 text-primary-500" icon="bxs:user-circle" />
                <div className="border-b-2 border-primary-500 focus:outline-none placeholder:text-slate-400 w-full h-fit resize-none max-h-fit overflow-auto" contentEditable></div>
                <button className="bg-primary-500 p-1 h-10 border-2 border-blue-400 hover:bg-primary-600 rounded text-white w-20">Enviar</button>
            </div>
        </div>
    );
};