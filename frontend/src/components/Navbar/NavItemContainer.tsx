import { PropsWithChildren } from "react";

interface INavItemContainer {
  isMobileView: boolean;
}

export const NavItemContainer = ({
  isMobileView,
  children,
}: PropsWithChildren<INavItemContainer>) => (
  <div
    className={`flex flex-row align-middle items-center ${
      isMobileView ? "w-full justify-around" : "justify-between w-64"
    }`}
  >
    {children}
  </div>
);
