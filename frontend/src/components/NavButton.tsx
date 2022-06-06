import { Icon } from "@iconify/react";

interface INavButtonProp {
  icon: string;
}

export const NavButon = ({ icon }: INavButtonProp) => {
  return (
    <div className="mx-6 py-2">
      <Icon className="w-7 h-7 text-primary-500" icon={icon} />
    </div>
  );
};
