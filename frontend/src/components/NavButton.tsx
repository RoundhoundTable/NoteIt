import { Icon } from "@iconify/react";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface INavButtonProp {
  icon: string;
  link?: string;
  onClick?: MouseEventHandler;
}

export const NavButon = ({ icon, link = "", onClick }: INavButtonProp) => {
  return (
    <Link to={link} className="mx-6 py-2">
      <Icon className="w-7 h-7 text-primary-500" icon={icon} onClick={onClick} />
    </Link>
  );
};