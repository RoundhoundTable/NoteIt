import { TopNavbar } from "../components/TopNavbar";
import placeholderPath from "../assets/images/placeholder.jpg";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const AddNotebook = () => {
  const [name, setName] = useState("New Notebook");
  const inputHandler = (ev: any) => setName(ev.target.value);

  return (
    <div className="font-montserrat flex flex-col justify-center items-center">
      <div className="shadow-xl shadow-primary-500/30 p-5 mt-20 border-2 md:max-w-7xl max-w-sm align-middle">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col align-middle justify-center">
            <div className="relative group mb-7">
              <img
                src={placeholderPath}
                className="max-w-28 max-h-60 rounded-full mx-auto"
              />
              <div className="w-12 h-12 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid justify-items-center items-center bg-primary-900/70 group-hover:w-full group-hover:h-full">
                <Icon
                  className="w-7 h-7 text-white"
                  icon="icon-park-outline:add-picture"
                />
                <input
                  type="file"
                  className="absolute w-full h-full opacity-0"
                />
              </div>
              <button className="w-12 h-12 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid justify-items-center items-center bg-primary-900/70 group-hover:w-60 group-hover:h-60">
                <Icon
                  className="w-7 h-7 text-white parent"
                  icon="icon-park-outline:add-picture"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-5">
            <div className="border-b-2 border-primary-500 text-4xl">
              <input
                className="font-extrabold text-primary-500/70 focus:outline-none max-w-xs"
                type="text"
                value={name}
                onChange={inputHandler}
              />
            </div>
            <div>
              <textarea
                className=" placeholder:italic placeholder:text-primary-500/40 h-72 w-full rounded-md min-h-10 resize-none mt-6 p-2 border-2 border-primary-500/30 focus:outline-none text-lg"
                placeholder="Description (Optional)"
              ></textarea>
            </div>
            <div className="flex flex-row-reverse">
              <button className="mt-5 bg-primary-400 rounded font-semibold text-sm text-white w-full h-10 md:w-40 md:h-8">
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNotebook;
