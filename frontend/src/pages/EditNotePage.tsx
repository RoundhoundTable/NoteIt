import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import { note, noteData } from "../graphql/queries/note";
import { note as noteMutation } from "../graphql/mutations/note";
import { ENoteMutationType } from "../enums/EMutationTypes";
import { BUTTONS, NoteItButton } from "../components/NoteIt/Button";
import { useForm } from "../hooks/useForm";

interface IEditNoteForm {
  id: string;
  content: string;
}

export const EditNotePage = () => {
  const { id } = useParams();
  const { form, updateForm, errors, onError, resetErrors } =
    useForm<IEditNoteForm>({
      initialValue: {
        id: id!,
        content: "",
      },
    });
  const { data } = useQuery<noteData>(note, {
    variables: {
      noteId: id,
    },
  });
  const [EditNote, { data: response }] = useMutation(noteMutation, {
    onError,
  });
  const [content, setContent] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (data) {
      if (!data.note.isOwner) navigateTo("/");
      updateForm({ ...form, content: data.note.content });
    }
  }, [data]);

  useEffect(() => {
    updateForm({ ...form, content });
  }, [content]);

  const submit = () => {
    resetErrors();
    EditNote({
      variables: {
        type: ENoteMutationType.EDIT,
        payload: {
          ...form,
        },
      },
    });
  };

  useEffect(() => {
    if (response?.note.edited) navigateTo(`/n/${id}`);
  }, [response]);

  return data ? (
    <div className="font-montserrat flex flex-col justify-center items-center">
      <div className="shadow-xl shadow-primary-500/30 p-5 mt-20 border-2 max-w-7xl">
        <div className="align-middle">
          <RichTextEditor
            cb={setContent}
            initialContent={data.note.content}
            error={{ message: errors?.content }}
          />
        </div>
        <div className="flex flex-row-reverse">
          <NoteItButton
            type={BUTTONS.PRIMARY}
            className="mt-5 font-semibold text-sm w-full md:w-40 md:h-8"
            onClick={submit}
          >
            Actualizar
          </NoteItButton>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
