import { PropsWithChildren } from "react";

interface ISelectProps {
  label?: string;
  name: string;
  className?: string;
  onChange?: (...args: any) => any;
  error?: {
    message?: string;
  };
  defaultValue?: string;
}

export const NoteItSelect = ({
  name,
  label,
  onChange,
  className,
  error,
  defaultValue,
  children,
}: PropsWithChildren<ISelectProps>) => (
  <label className="flex flex-col text-sm font-montserrat text-left text-primary-700 mt-2">
    {label}
    <select
      name={name}
      className={`placeholder:italic placeholder:text-primary-500/40 pl-2 h-8  bg-primary-500/25 rounded-md ${
        error?.message ? "border-2 border-danger-500" : ""
      } ${className}`}
      placeholder=""
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {children}
    </select>
    {error?.message && (
      <div className="text-xs font-light text-danger-500">{error.message}</div>
    )}
  </label>
);
