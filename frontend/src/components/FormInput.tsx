interface IFormInputProps {
  label: string;
  inputType: string;
}

export const FormInput = ({ label, inputType }: IFormInputProps) => {
  return (
    <>
      <label className="flex flex-col text-sm font-montserrat lg:px-2 text-left">
        {label}
      </label>
      <input
        className="flex flex-col px-3 h-8 bg-primary-500/40 mt-1"
        type={inputType}
      />
    </>
  );
};
