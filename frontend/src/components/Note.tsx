import { Icon } from "@iconify/react";

export const Note = () => {
    return (
        <article className="p-4 max-w-xl shadow-xl  shadow-primary-500/30 flex flex-col pt-5 mt-5 max-h-max">
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
                <p className="line-clamp-[15] text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione illum maxime quibusdam? Delectus voluptatem quo veniam, accusamus optio labore. Quae, eius velit voluptates commodi nam amet placeat officiis consequuntur cupiditate.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur possimus suscipit sed. Numquam molestias labore tenetur. Facilis omnis debitis distinctio nisi provident quod neque explicabo unde aliquid accusantium? Similique, sapiente?
                </p>
            </div>
            <div className="flex flex-row justify-evenly mt-4">
                <div className="flex flex-row items-center">
                    <Icon className="w-6 h-6 text-primary-500" icon="bx:like"/>
                    <p className="text-sm text-primary-500 font-medium mx-2">123</p>
                    <Icon className="w-6 h-6 text-primary-500" icon="bx:dislike"/>
                </div>
                <Icon className="w-6 h-6 text-primary-500" icon="bxs:comment"/>
            </div>
        </article>
    );
};