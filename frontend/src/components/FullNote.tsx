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
                    <p className="text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione illum maxime quibusdam? Delectus voluptatem quo veniam, accusamus optio labore. Quae, eius velit voluptates commodi nam amet placeat officiis consequuntur cupiditate.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur possimus suscipit sed. Numquam molestias labore tenetur. Facilis omnis debitis distinctio nisi provident quod neque explicabo unde aliquid accusantium? Similique, sapiente?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam accusantium sint quidem iusto expedita fugit libero. Aperiam qui nihil ut minima! In architecto ab voluptates. Autem id unde numquam.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde earum sit modi possimus ducimus repellat, laboriosam, ab asperiores dolor illo consectetur placeat sint. Veniam voluptates, sint amet minima odio alias.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe autem odio minima beatae earum repellendus repudiandae ullam porro delectus nostrum a inventore, magni cum, eveniet omnis, quod odit doloribus.
                        Dolore repellat, dignissimos tenetur itaque, aliquam repudiandae modi debitis voluptates commodi suscipit voluptate veniam, odio numquam cupiditate voluptas explicabo! Aut in, unde voluptate quas voluptatum consequatur accusantium quia dignissimos consectetur!
                        Maxime ipsum eos neque inventore ad. Pariatur inventore nesciunt dolorum, nisi quae temporibus debitis alias error quam beatae quis, soluta iste ad amet molestias laudantium voluptate quasi deserunt voluptatem exercitationem.
                        Temporibus voluptatem quam placeat praesentium illum nobis minima dolorum pariatur, aliquid repellendus quaerat voluptate corporis nihil optio aspernatur facere, veritatis quis tempore ad officiis. Neque pariatur adipisci debitis sunt delectus?
                        Nesciunt soluta veritatis repellat in culpa labore incidunt obcaecati, ea voluptatum omnis iste. Dolores corrupti, omnis qui officiis est debitis earum. Nobis commodi possimus itaque voluptatum! Ex, molestiae tempora! Mollitia.
                    </p>
                </div>
            </div>
        </article>
    );
};
