import { NavButon } from "./NavButton";

interface IActionsProp {
  className?: string
}

export const Actions = ({className}: IActionsProp) => {
  return (
    <div className={className}>
      <NavButon icon="ant-design:home-filled" />
      <NavButon icon="ic:outline-explore" />
      <NavButon icon="fluent:add-circle-24-regular" />
      <NavButon icon="bxs:user-circle" />
    </div>
  );
};
