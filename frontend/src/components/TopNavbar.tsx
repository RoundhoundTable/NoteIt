import { Search } from "./Search";
import { Logo } from "./Logo";
import { Actions } from "./Actions";

export const TopNavbar = () => {
  return (
    <nav className="flex flex-row justify-around py-2 shadow-xl shadow-primary-500/10 bg-white">
      <Search />
      <Logo className="h-11"/>
      <Actions className="flex-row align-middle hidden md:flex justify-between w-64"/>
    </nav>
  );
};