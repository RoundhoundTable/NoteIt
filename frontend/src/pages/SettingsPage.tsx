import { Tab, Tabs, TabsHeader, TabsBody, TabPanel } from "@material-tailwind/react";
import { ProfileHeader } from "../components/ProfileHeader";
import placeholderPath from "../assets/images/placeholder.jpg"
import { Icon } from "@iconify/react";

export const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-5 items-center w-full">
      <ProfileHeader/>
      <Tabs className="p-5 w-3/4 shadow-lg shadow-primary-500/50" value="profile">
        <TabsHeader className="w-full">
            <Tab className="text-primary-500 font-semibold w-1/2 md:w-36 py-2 border-primary-500 border-b-4" value="profile">Perfil</Tab>
            <Tab className="text-gray-400 font-semibold w-1/2 md:w-36 py-2 border-gray-300 border-b-2" value="account">Cuenta</Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="profile" className="flex flex-col gap-10 md:flex-row md:gap-0 justify-around items-center md:items-center">
            <div className="flex flex-col gap-5">
              <p className="text-2xl text-primary-500 font-semibold">Nombre de Usuario</p>
              <div className="flex flex-col md:flex-row gap-5">
                <input type="text" className="font-semibold text-primary-500 px-3 h-11 border-2 border-primary-500 outline-primary-600 rounded"/>
                <button className="font-semibold text-white bg-primary-500 w-full md:w-24 h-11 rounded">Cambiar</button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-5">
              <p className="text-2xl text-primary-500 font-semibold">Foto de Perfil</p>
              <div className="relative group">
                <img src={placeholderPath} className="max-w-60 max-h-60 rounded-full"/>
                <button className="w-12 h-12 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid justify-items-center items-center bg-primary-900/70 group-hover:w-60 group-hover:h-60">
                  <Icon className="w-7 h-7 text-white parent" icon="icon-park-outline:add-picture" />
                </button>
              </div>
            </div>
          </TabPanel>

          <TabPanel value="account" className="flex flex-col gap-16 items-center md:items-start">
            <div className="flex flex-col gap-5">
              <p className="text-2xl text-primary-500 font-semibold">Correo Electrónico</p>
              <div className="flex flex-col md:flex-row gap-5">
                <input type="text" className="font-semibold text-primary-500 px-3 h-11 border-2 border-primary-500 rounded"/>
                <button className="font-semibold text-white bg-primary-500 w-full md:w-24 h-11 rounded">Cambiar</button>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-2xl text-primary-500 font-semibold">Contraseña</p>
              <div className="flex flex-col md:flex-row gap-5">
                <input type="text" className="font-semibold text-primary-500 px-3 h-11 border-2 border-primary-500 rounded"/>
                <button className="font-semibold text-white bg-primary-500 md:w-24 h-11 rounded">Cambiar</button>
              </div>
            </div>
            <button className="font-bold text-white text-lg bg-danger-500 h-11 w-60 rounded">Eliminar Cuenta</button>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};