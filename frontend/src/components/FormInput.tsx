interface IFormInputProps {
  label: string;
  inputType: string;
}

export const FormInput = ({ label, inputType }: IFormInputProps) => {
  return (
    <>
      <label className="flex flex-col text-sm font-montserrat text-left text-primary-700 mt-2">
        {label}
        <input
          className="flex flex-col h-8 bg-primary-500/40 rounded-md"
          type={inputType}
        />
      </label>
    </>
  );
};
