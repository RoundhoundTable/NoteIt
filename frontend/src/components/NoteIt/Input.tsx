import { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

interface IInputProps {
  label?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  errorClassName?: string;
  onChange?: (...args: any) => any;
  error?: {
    message?: string;
  };
  value?: string;
}

export const NoteItInput = ({
  label,
  name,
  type,
  className,
  errorClassName = "border-2 border-danger-500",
  onChange,
  error,
  value,
}: IInputProps) => {
  return (
    <label className="flex flex-col text-sm font-montserrat text-left text-primary-700 mt-2 w-full">
      {label}
      <input
        className={twMerge(
          "px-2 flex flex-col h-8 bg-primary-500/40 rounded-md autofill:bg-none",
          className,
          error?.message ? errorClassName : ""
        )}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error?.message && (
        <div className="text-xs font-light text-danger-500">
          {error.message}
        </div>
      )}
    </label>
  );
};
