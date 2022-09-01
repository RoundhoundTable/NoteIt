import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ECommentMutationType } from "../enums/EMutationTypes";
import { comment } from "../graphql/mutations/comment";
import { useForm } from "../hooks/useForm";
import { BUTTONS, NoteItButton } from "./NoteIt/Button";
import { NoteItInput } from "./NoteIt/Input";

interface ICommentFormProps {
  noteId: string;
}

interface ICommentForm {
  noteId: string;
  content: string;
}

export const CommentForm = ({ noteId }: ICommentFormProps) => {
  const { currentUser } = useAuth();
  const navigateTo = useNavigate();
  const { form, errors, onChange, resetErrors, onError } =
    useForm<ICommentForm>({
      noteId: noteId,
      content: "",
    });
  const [CreateComment, { data }] = useMutation(comment, {
    onError,
  });

  const handleSubmit = () => {
    resetErrors();
    CreateComment({
      variables: {
        type: ECommentMutationType.CREATE,
        payload: {
          ...form,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      navigateTo(0);
    }
  }, [data]);

  return currentUser ? (
    <div className="border-b-2">
      <div className="flex flex-row w-full p-2 mb-4 items-center align-middle">
        <img
          src={currentUser.thumbnail}
          className="h-12 w-12 text-primary-500 rounded-full"
        />
        <NoteItInput
          name={"content"}
          type={"text"}
          onChange={onChange}
          className="rounded-none border-b-2 bg-white border-primary-500 focus:outline-none placeholder:text-slate-400 w-full h-11"
          errorClassName={"border-b-2 border-danger-500"}
          error={{ message: errors?.content }}
        />
        <NoteItButton
          type={BUTTONS.PRIMARY}
          className={"w-20"}
          onClick={handleSubmit}
        >
          Enviar
        </NoteItButton>
      </div>
    </div>
  ) : (
    <></>
  );
};
