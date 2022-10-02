import { PropsWithChildren } from "react";

export const Footer = (props: PropsWithChildren<any>) => {
  return (
    <div className="flex flex-row justify-evenly mt-4">{props.children}</div>
  );
};
