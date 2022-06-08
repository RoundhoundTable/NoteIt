interface IFormButtonProps {
    text: string;
}

export const FormButton = (props: IFormButtonProps) => {
    return (
        <button className="mt-5 bg-primary-400 rounded font-semibold text-sm text-white relative inline-block h-8 w-4/5 translate-y-1/2" >
            {props.text}
        </button >
    );
}