import { Icon } from "@iconify/react";

export const DropdownNote = () => {
    return (
        <div className="relative w-full">
            <ul className="z-10 absolute right-0 bottom-0 md:bottom-auto bg-white mb-3 rounded shadow-xl shadow-primary-500/30 text-center text-primary-500 px-5">
                <li>
                    <button className="p-2 font-semibold flex flex-row gap-2 items-center w-full hover:bg-gray-200">
                        <Icon className="w-5 h-5 text-primary-500" icon="ant-design:edit-filled"></Icon>
                        <p>Edit</p>
                    </button>
                </li>
                <li>
                    <button className="p-2 font-semibold text-danger-500 flex flex-row gap-2 items-center w-full hover:bg-gray-200">
                        <Icon className="w-5 h-5 text-danger-500" icon="bi:trash-fill"/>
                        <p>Delete</p>
                    </button>
                </li>
            </ul>
        </div>
    );
}