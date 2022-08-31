import { IModalProps } from "../interfaces/IModalProps";
import { BUTTONS, NoteItButton } from "./NoteIt/Button";

export const Modal = (props: IModalProps) => (
  <div className="w-screen h-screen fixed top-0 left-0 grid items-center justify-items-center z-10 bg-primary-200/5 backdrop-blur-[2px]">
    <div className="bg-white w-fit px-8 py-5 rounded border-primary-200 border-2">
      {props.message}
      <div className="flex flex-col md:flex-row gap-5 justify-end w-full px-2 pt-7">
        <NoteItButton
          type={BUTTONS.PRIMARY}
          onClick={props.acceptOption.onClick}
          className={"w-28"}
        >
          {props.acceptOption.text}
        </NoteItButton>
        <NoteItButton
          type={BUTTONS.DANGER}
          onClick={props.cancelOption.onClick}
          className={"w-28"}
        >
          {props.cancelOption.text}
        </NoteItButton>
      </div>
    </div>
  </div>
);
