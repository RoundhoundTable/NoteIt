import { useEffect, useState } from "react";
import { ImageInput } from "../../components/ImageInput";
import defaultThumbnail from "../../assets/images/default_notebook.jpg";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { notebook } from "../../graphql/mutations/notebook";
import { ENotebookMutationType } from "../../enums/EMutationTypes";
import { BUTTONS, NoteItButton } from "../../components/NoteIt/Button";
import { useAuth } from "../../context/AuthProvider";
import { useForm } from "../../hooks/useForm";
import { NoteItTextarea } from "../../components/NoteIt/Textarea";
import { NoteItInput } from "../../components/NoteIt/Input";

interface INotebookForm {
  name: string;
  description: string;
  thumbnail: string;
}

export const CreateNotebookPage = () => {
  const navigateTo = useNavigate();
  const { currentUser } = useAuth();
  const { form, updateForm, onChange, errors, onError } =
    useForm<INotebookForm>();
  const [CreateNotebook, { data }] = useMutation(notebook, {
    onError,
  });
  const [imageData, setImageData] = useState("");

  const submitNotebook = () => {
    CreateNotebook({
      variables: {
        type: ENotebookMutationType.CREATE,
        payload: {
          ...form,
        },
      },
    });
  };

  useEffect(() => {
    if (imageData)
      updateForm({
        thumbnail: imageData,
      } as INotebookForm);
  }, [imageData]);

  useEffect(() => {
    if (data?.notebook.created) navigateTo(`/nb/${form.name}`);
  }, [data]);

  return (
    currentUser && (
      <div className="font-montserrat flex flex-col justify-center items-center">
        <div className="shadow-xl shadow-primary-500/30 p-5 mt-5 md:mt-20 border-2 md:max-w-7xl max-w-sm align-middle">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col align-middle justify-center px-16">
              <ImageInput
                className="w-full"
                displayImage={imageData || defaultThumbnail}
                cb={setImageData}
              />
            </div>
            <div className="flex flex-col w-full">
              <NoteItInput
                name="name"
                type={"text"}
                onChange={onChange}
                error={{ message: errors?.name }}
                className="border-b-2 text-3xl py-4 h-10 border-primary-500 w-full font-extrabold text-primary-500/70 focus:outline-none bg-white"
              />
              <div>
                <NoteItTextarea
                  name="description"
                  onChange={onChange}
                  error={{ message: errors?.description }}
                />
              </div>
              <div className="flex flex-row-reverse">
                <NoteItButton
                  type={BUTTONS.PRIMARY}
                  className="mt-5 font-semibold w-full md:w-40 md:h-8"
                  onClick={submitNotebook}
                >
                  Crear
                </NoteItButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
