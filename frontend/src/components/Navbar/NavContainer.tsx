import { PropsWithChildren } from "react";

interface INavContainer {
  isMobileView: boolean;
}

export const NavContainer = ({
  isMobileView,
  children,
}: PropsWithChildren<INavContainer>) => {
  return isMobileView ? (
    <nav className="sticky bottom-0 w-full bg-white shadow shadow-primary-500 z-10">
      {children}
    </nav>
  ) : (
    <nav className="sticky top-0 w-full flex flex-row justify-around items-center py-2 shadow-xl shadow-primary-500/10 bg-white z-10">
      {children}
    </nav>
  );
};
