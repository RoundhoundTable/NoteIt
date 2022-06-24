import { Search } from "./Search";
import { Logo } from "./Logo";
import { Actions } from "./Actions";
import { useEffect, useState } from "react";

export const TopNavbar = () => {
  const [width, setWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
      window.addEventListener('resize', () => setWidth(window.innerWidth))
      return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
  });
  
  return (
    <nav className="sticky w-full flex flex-row justify-around py-2 shadow-xl shadow-primary-500/10 bg-white">
      {width >= 768 && <Search />}
      <Logo className="h-11"/>
      {width >= 768 && <Actions className="flex-row align-middle hidden md:flex justify-between w-64"/>}
    </nav>
  );
};