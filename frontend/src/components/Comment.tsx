import { Icon } from "@iconify/react";

export const Comment = () => {
    return (
        <div className="py-2 border-l-4 border-primary-500">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row items-center p-2">
                    <Icon className="h-12 w-12 text-primary-500" icon="bxs:user-circle" />
                    <div>
                        <p className="text-primary-800 text-base font-medium">User-Name</p>
                        <p className="text-primary-400 text-xs font-extralight">nb/notebook - 02-02-2022 22:22</p>
                    </div>
                </div>
                <Icon icon="bi:trash-fill" className="text-primary-500" />
            </div>
            <div className="flex flex-col px-4 ml-10">
                <p className="text-base">
                    Basta loco sos demasiado lindo
                </p>
            </div>
        </div>
    );
};