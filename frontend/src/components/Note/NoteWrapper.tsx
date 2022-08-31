import { PropsWithChildren } from "react";

interface INoteWrapperProps {
  isPreview?: boolean;
}

export const NoteWrapper = (props: PropsWithChildren<INoteWrapperProps>) =>
  props.isPreview ? (
    <article className="p-4 w-screen max-w-2xl shadow-xl shadow-primary-500/30 flex flex-col pt-5 mt-5">
      {props.children}
    </article>
  ) : (
    <article className="p-6 max-h-max shadow-xl shadow-primary-500/30 flex flex-row item-center  max-w-7xl">
      {props.children}
    </article>
  );
