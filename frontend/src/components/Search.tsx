import { Icon } from "@iconify/react";

export const Search = () => {
  return (
    <form className="py-1 hidden md:block">
      <input
        type="text"
        placeholder="Buscar..."
        className="h-8 bg-primary-500/25 rounded-l-full px-4 inline-block align-middle"
      />
      <button className="w-7 h-8 inline-block align-middle bg-primary-500/25 rounded-r-full">
        <Icon className="w-6 h-6" icon="ci:search" />
      </button>
    </form>
  );
};
