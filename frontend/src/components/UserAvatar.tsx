interface IUserAvatarProps {
  src: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export const UserAvatar = (props: IUserAvatarProps) => {
  return <img className="h-12 w-12 rounded-full aspect-square" {...props} />;
};
