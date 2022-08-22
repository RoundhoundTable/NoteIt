import { Icon } from "@iconify/react";

export const DropdownNotebook = ({ role }: {role: string}) => {
    return (
        <div className="relative w-full">
            <ul className="z-10 absolute right-0 bottom-0 md:bottom-auto bg-white my-3 rounded shadow-xl shadow-primary-500/30 text-center text-primary-500">
                <li>
                    <button className="p-2 font-semibold flex flex-row gap-1 justify-center items-center w-full">
                        { role === "User" &&  <><Icon className="w-5 h-5" icon="ic:baseline-add-moderator"/><p>Mode</p></>}
                        { role === "Mod" &&  <><Icon className="w-5 h-5" icon="ic:baseline-remove-moderator"/><p>Moden't</p></>}
                    </button>
                </li>
                <li>
                    <button className="p-2 font-semibold text-danger-500 flex flex-row gap-1 justify-center items-center w-full">Kick</button>
                </li>
            </ul>
        </div>
    );
}