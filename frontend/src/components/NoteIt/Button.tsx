import { PropsWithChildren } from "react";

export enum BUTTONS {
  PRIMARY = "bg-primary-500 border-primary-400 text-white hover:bg-primary-300",
  DANGER = "border-danger-400 text-red-600 hover:bg-danger-600 hover:text-white",
}

interface IButtonProps {
  type: BUTTONS;
  className?: string;
  onClick?: (...args: any) => any;
}

export const NoteItButton = ({
  type,
  className,
  onClick,
  children,
}: PropsWithChildren<IButtonProps>) => (
  <button
    onClick={onClick}
    className={`p-1 h-10 border-2 rounded ${type} ${className}`}
  >
    {children}
  </button>
);
