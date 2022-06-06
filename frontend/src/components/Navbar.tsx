import { Search } from "./Search";
import { Logo } from "./Logo";
import { Actions } from "./Actions";

export const Navbar = () => {
  return (
    <nav className="flex flex-row justify-around py-2 shadow-xl shadow-primary-500/10 bg-white">
      <Search />
      <Logo />
      <Actions />
    </nav>
  );
};