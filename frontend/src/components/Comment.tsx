import { Icon } from "@iconify/react";
import { useState } from "react";

export const Comment = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => setShowModal(!showModal);

    return (
        <>
            <div className="py-2 border-l-4 border-primary-500">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row items-center p-2">
                        <Icon className="h-12 w-12 text-primary-500" icon="bxs:user-circle" />
                        <div>
                            <p className="text-primary-800 text-base font-medium">User-Name</p>
                            <p className="text-primary-400 text-xs font-extralight">nb/notebook - 02-02-2022 22:22</p>
                        </div>
                    </div>
                    <button>
                        <Icon icon="bi:trash-fill" className="text-primary-500" onClick={toggleModal}/>
                    </button>
                </div>
                <div className="flex flex-col px-4 ml-10">
                    <p className="text-base break-all">
                        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    </p>
                </div>
            </div>
            {

                showModal ? <div className="w-screen h-screen fixed top-0 left-0 grid items-center justify-items-center z-10 bg-primary-200/10 backdrop-blur-[2px]">
                <div className="bg-white w-fit px-8 py-5 rounded">
                    ¿Estas seguro de que deseas eliminar el comentario?
                    <div className="flex flex-col md:flex-row gap-5 justify-end w-full px-2 pt-7">
                        <button className="bg-primary-500 p-1 h-10 border-2 border-blue-400 hover:bg-primary-600 rounded text-white w-full md:w-20">Aceptar</button>
                        <button className="text-danger-500 p-1 h-10 w-full md:w-20 font-semibold" onClick={toggleModal}>Cancelar</button>
                    </div>
                </div>
            </div> : <></>
            }
        </>
    );
};