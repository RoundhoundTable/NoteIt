import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface INavItem {
  link?: string;
}

export const NavItem = (props: PropsWithChildren<INavItem>) =>
  props.link ? (
    <Link to={props.link} className="mx-6 py-2">
      {props.children}
    </Link>
  ) : (
    <div>{props.children}</div>
  );
