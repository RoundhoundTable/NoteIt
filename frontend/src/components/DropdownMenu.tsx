import { MutableRefObject, PropsWithChildren } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface IDropdownMenuProps {
  togglerFunc: (event: any) => void;
}

export const DropdownMenu = ({
  togglerFunc,
  children,
}: PropsWithChildren<IDropdownMenuProps>) => {
  const ref = useOutsideClick(togglerFunc) as MutableRefObject<HTMLDivElement>;

  return (
    <div ref={ref} className="relative w-full">
      <ul className="z-10 absolute right-0 bottom-0 md:bottom-auto w-52 bg-white my-3 rounded shadow-xl shadow-primary-500/30 text-center text-primary-500">
        {children}
      </ul>
    </div>
  );
};
