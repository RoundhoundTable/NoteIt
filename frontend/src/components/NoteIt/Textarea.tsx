interface ITextareaProps {
  label?: string;
  name: string;
  className?: string;
  onChange?: (...args: any) => any;
  error?: {
    message?: string;
  };
}

export const NoteItTextarea = ({
  label,
  name,
  className,
  onChange,
  error,
}: ITextareaProps) => (
  <label className="flex flex-col text-sm font-montserrat text-left text-primary-700 mt-2">
    {label}
    <textarea
      className={`placeholder:italic placeholder:text-primary-500/40 h-72 w-full rounded-md min-h-10 resize-none mt-6 p-2 border-2 border-primary-500/30 focus:outline-none text-lg ${className}`}
      placeholder="Description (Optional)"
      name={name}
      onChange={onChange}
    ></textarea>
    {error?.message && (
      <div className="text-xs font-light text-danger-500">{error.message}</div>
    )}
  </label>
);
