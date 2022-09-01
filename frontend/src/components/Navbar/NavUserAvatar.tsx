import defaultThumbnail from "../../assets/images/default_thumbnail.jpg";
import { useAuth } from "../../context/AuthProvider";
import { NavItem } from "./NavItem";

interface INavUserAvatar {
  onClick: React.MouseEventHandler<HTMLImageElement>;
}

export const NavUserAvatar = ({ onClick }: INavUserAvatar) => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <NavItem>
      <img
        src={currentUser.thumbnail}
        className="h-8 w-8 rounded-full"
        onClick={onClick}
      />
    </NavItem>
  ) : (
    <NavItem link="/account/login">
      <img src={defaultThumbnail} className="w-8 h-8 rounded-full" />
    </NavItem>
  );
};
