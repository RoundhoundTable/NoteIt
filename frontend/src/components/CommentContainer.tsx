import { CommentForm } from "./CommentForm";

interface ICommentContainerProps {
  noteId: string;
}

export const CommentContainer = ({
  children,
  noteId,
}: React.PropsWithChildren<ICommentContainerProps>) => (
  <div className="flex flex-col items-center w-2/3">
    <section className="px-6 max-h-5xl shadow-xl shadow-primary-500/30 flex flex-col py-5 mt-5 w-4/5 gap-4">
      <CommentForm noteId={noteId} />
      {children}
    </section>
  </div>
);
