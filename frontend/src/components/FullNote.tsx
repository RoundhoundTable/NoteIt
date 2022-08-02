    import { Icon } from "@iconify/react";

export const FullNote = () => {
    return (
        <article className="p-6 max-h-max shadow-xl shadow-primary-500/30 flex flex-row item-center max-w-5xl">
            <div className="flex flex-col items-center mt-8">
                <Icon className="w-6 h-6 text-primary-500" icon="bx:like"/>
                <p className="text-sm text-primary-500 font-medium mx-2">123</p>
                <Icon className="w-6 h-6 text-primary-500" icon="bx:dislike"/>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between w-full mb-4">
                    <div className="flex flex-row items-center">
                        <Icon className="h-12 w-12 text-primary-500" icon="bxs:user-circle" />
                        <div>
                            <p className="text-primary-800 text-base font-medium">User-Name</p>
                            <p className="text-primary-400 text-xs font-extralight">nb/notebook - 02-02-2022 22:22</p>
                        </div>
                    </div>
                    <Icon className="opcion" icon="simple-line-icons:options-vertical" />
                </div>
                <div className="flex flex-col px-4">
                    <h2 className="font-semibold text-xl">Note Title</h2>
                    <p className="text-base break-all">
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </p>
                </div>
            </div>
        </article>
    );
};
