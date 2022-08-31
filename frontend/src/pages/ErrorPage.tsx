import { Link } from "react-router-dom";
import { BUTTONS, NoteItButton } from "../components/NoteIt/Button";

interface IErrorPageProps {
  title: string;
  message: string;
}

export const ErrorPage = (props: IErrorPageProps) => {
  return (
    <div className="absolute flex flex-col w-screen h-screen items-center justify-center">
      <h1 className="font-extrabold text-7xl text-primary-500/70">
        {props.title}
      </h1>
      <p className="text-xl mt-4">{props.message}</p>
      <NoteItButton
        type={BUTTONS.PRIMARY}
        className="w-64 flex flex-row items-center justify-center rounded mt-16"
      >
        <Link to="/" className="font-semibold text-base w-full">
          Volver al Inicio
        </Link>
      </NoteItButton>
    </div>
  );
};
