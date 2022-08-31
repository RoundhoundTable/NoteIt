import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import { Navigate, useNavigate } from "react-router-dom";
import { joined, joinedData } from "../../graphql/queries/joined";
import { note } from "../../graphql/mutations/note";
import { Note } from "../../interfaces/Entities";
import { ENoteMutationType } from "../../enums/EMutationTypes";
import { BUTTONS, NoteItButton } from "../../components/NoteIt/Button";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../context/AuthProvider";
import { NoteItInput } from "../../components/NoteIt/Input";
import { NoteItSelect } from "../../components/NoteIt/Select";

interface INoteForm {
  notebookName: string;
  title: string;
  content: string;
}

export const CreateNotePage = () => {
  const { currentUser } = useAuth();
  const { form, updateForm, onChange, errors, onError, resetErrors } =
    useForm<INoteForm>();
  const [CreateNote, { data }] = useMutation(note, {
    onError,
  });
  const { data: _joined } = useQuery<joinedData>(joined);
  const [content, setContent] = useState<string>("");
  const navigateTo = useNavigate();

  const submitNote = () => {
    resetErrors();
    CreateNote({
      variables: {
        type: ENoteMutationType.CREATE,
        payload: {
          ...form,
        },
      },
    });
  };

  useEffect(() => {
    updateForm({
      ...form,
      content: content,
    });
  }, [content]);

  useEffect(() => {
    if (data) navigateTo(`/n/${data.note.created}`);
  }, [data]);

  if (!currentUser) <Navigate to="/account/login" />;

  return (
    <div className="font-montserrat flex flex-col justify-center items-center">
      <div className="shadow-xl shadow-primary-500/30 p-5 mt-20 border-2 w-3/4">
        <NoteItSelect
          label="Notebook"
          name="notebookName"
          onChange={onChange}
          error={{ message: errors?.notebookName }}
          className="md:w-1/3"
          defaultValue=""
        >
          <option className="text-primary-500/40" value="" disabled />
          {_joined &&
            _joined.joined.map((membership: any, key: number) => {
              return (
                <option
                  className="text-white"
                  key={key}
                  value={membership.notebook.name}
                >
                  {membership.notebook.name}
                </option>
              );
            })}
        </NoteItSelect>
        <NoteItInput
          label="Title"
          type={"text"}
          className="md:w-1/3"
          name="title"
          onChange={onChange}
          error={{ message: errors?.title }}
        />
        <div className="align-middle mt-3">
          <RichTextEditor
            cb={setContent}
            error={{ message: errors?.content }}
          />
        </div>
        <div className="flex flex-row-reverse">
          <NoteItButton
            type={BUTTONS.PRIMARY}
            className="mt-5 font-semibold text-sm w-full md:w-40 md:h-8"
            onClick={submitNote}
          >
            Publicar
          </NoteItButton>
        </div>
      </div>
    </div>
  );
};

export {};
