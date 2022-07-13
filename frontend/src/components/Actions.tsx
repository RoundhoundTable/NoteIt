import { useEffect, useState } from "react";
import { NavButon } from "./NavButton";
import { DropdownMenu } from "./DropdownMenu";

interface IActionsProp {
  className?: string
}

export const Actions = ({className}: IActionsProp) => {
  const isLoggedIn = true;
  
  const [ showDropdown, setShowDropdown ] = useState<boolean>(false)

  const toggleDropdown = () => setShowDropdown (!showDropdown);

  const [width, setWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
      window.addEventListener('resize', () => setWidth(window.innerWidth))
      return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
  });

  return (
    <div className="flex flex-col">
      { isLoggedIn && width < 768 && showDropdown && <DropdownMenu/> }
      <div className={className}>
        <NavButon icon="ant-design:home-filled" />
        <NavButon icon="ic:outline-explore" />
        <NavButon icon="fluent:add-circle-24-regular" />
        
        { isLoggedIn ? <NavButon icon="bxs:user-circle" onClick={toggleDropdown}/> : <NavButon icon="bxs:user-circle" link="/account/login"/>}
      </div>
      { isLoggedIn && width >= 768 && showDropdown && <DropdownMenu/> }
    </div>
  );
};