import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface INavButtonProp {
  icon: string;
  link?: string;
}

export const NavButon = ({ icon, link = "" }: INavButtonProp) => {
  return (
    <Link to={link} className="mx-6 py-2">
      <Icon className="w-7 h-7 text-primary-500" icon={icon} />
    </Link>
  );
};