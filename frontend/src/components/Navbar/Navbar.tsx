import { Icon } from "@iconify/react";
import { useContext, useState } from "react";
import { AuthContext, useAuth } from "../../context/AuthProvider";
import { DropdownMenu } from "../DropdownMenu";
import { Logo } from "../Logo";
import { Searchbar } from "../Searchbar";
import { NavContainer } from "./NavContainer";
import { NavDropdown } from "./NavDropdown";
import { NavItem } from "./NavItem";
import { NavItemContainer } from "./NavItemContainer";
import { NavUserAvatar } from "./NavUserAvatar";

interface INavbarProps {
  mobileView?: boolean;
}

export const Navbar = ({ mobileView = false }: INavbarProps) => {
  const { currentUser } = useAuth() as AuthContext;

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownHandler = (event: any) => {
    setShowDropdown(!showDropdown);

    event.stopPropagation();
  };

  return (
    <NavContainer isMobileView={mobileView}>
      {!mobileView && <Searchbar />}
      {!mobileView && <Logo className="h-11" />}
      <div className="flex flex-col">
        <NavItemContainer isMobileView={mobileView}>
          <NavItem link="/">
            <Icon
              className="w-7 h-7 text-primary-500"
              icon="ant-design:home-filled"
            />
          </NavItem>
          {mobileView && (
            <NavItem link="/s/">
              <Icon
                className="w-7 h-7 text-primary-500"
                icon="ic:outline-explore"
              />
            </NavItem>
          )}
          <NavItem link="/new">
            <Icon
              className="w-7 h-7 text-primary-500"
              icon="fluent:add-circle-24-regular"
            />
          </NavItem>
          <NavUserAvatar onClick={dropdownHandler} />
        </NavItemContainer>
        {currentUser && showDropdown && (
          <DropdownMenu togglerFunc={setShowDropdown}>
            <NavDropdown />
          </DropdownMenu>
        )}
      </div>
    </NavContainer>
  );
};
