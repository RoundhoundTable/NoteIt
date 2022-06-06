import { NavButon } from "./NavButton";

export const Actions = () => {
  return (
    <div className="flex-row align-middle hidden md:flex">
      <NavButon icon="ant-design:home-filled" />
      <NavButon icon="ic:outline-explore" />
      <NavButon icon="fluent:add-circle-24-regular" />
      <NavButon icon="bxs:user-circle" />
    </div>
  );
};
