import { NavButon } from "./NavButton";

interface INavButtonProp {
  className?: string
}

export const Actions = ({className}: INavButtonProp) => {
  return (
    <div className={className}>
      <NavButon icon="ant-design:home-filled" />
      <NavButon icon="ic:outline-explore" />
      <NavButon icon="fluent:add-circle-24-regular" />
      <NavButon icon="bxs:user-circle" />
    </div>
  );
};
