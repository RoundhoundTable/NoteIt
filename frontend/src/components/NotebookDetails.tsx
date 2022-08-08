import { Icon } from "@iconify/react";

interface INotebookDetails {
    isEditMode: boolean;
}

export const NotebookDetails = ({ isEditMode }: INotebookDetails) => {
    return (
        <div className="bg-primary-600 text-white p-5 h-max md:w-96 md:mt-5">
            <div className="border-b-2 border-primary-800 pb-2">
                <p className="font-semibold">Descripcion:</p>
                {
                    isEditMode ? 
                    (
                        <textarea className="border-2 border-white bg-primary-600 w-full md:w-80 rounded h-32 overflow-hidden resize-none focus:outline-none"></textarea>
                    ) : (
                        <p className="text-sm break-all line-clamp-[5]">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis porro quod consequatur, incidunt est quisquam optio molestiae aspernatur autem numquam neque in nesciunt quia. Odio deleniti illo sit magnam consequuntur?
                        </p>
                    )
                }
            </div>
            <div className="py-2 max-w-lg flex flex-row items-center gap-2">
                <Icon className="h-8 w-8 text-white" icon="bxs:user" />
                Usuarios: 2
            </div>
        </div>
    )
}