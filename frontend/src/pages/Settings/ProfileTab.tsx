import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { BUTTONS, NoteItButton } from "../../components/NoteIt/Button";
import { ImageInput } from "../../components/ImageInput";
import { AuthContext, useAuth } from "../../context/AuthProvider";
import { EUserMutationType } from "../../enums/EMutationTypes";
import { user } from "../../graphql/mutations/user";
import { useForm } from "../../hooks/useForm";
import { NoteItInput } from "../../components/NoteIt/Input";

interface IProfileSettings {
  displayName?: string;
  thumbnail?: string;
}

export const ProfileTab = () => {
  const { currentUser, fetch } = useAuth();
  const { form, updateForm, onChange, errors, onError, resetErrors } =
    useForm<IProfileSettings>({
      displayName: currentUser?.displayName,
      thumbnail: currentUser?.thumbnail,
    });
  const [imageData, setImageData] = useState();
  const [updateSettings, { data }] = useMutation(user, {
    onError,
  });
  const [saveMessage, setSaveMessage] = useState("Guardar Cambios");

  const handleChange = () => {
    if (
      form.displayName !== currentUser?.displayName ||
      form.thumbnail !== currentUser?.thumbnail
    ) {
      setSaveMessage("Guardando Cambios...");
      resetErrors();

      updateSettings({
        variables: {
          type: EUserMutationType.EDIT,
          payload: {
            thumbnail:
              form.thumbnail !== currentUser?.thumbnail
                ? form.thumbnail
                : undefined,
            displayName:
              form.displayName !== currentUser?.displayName ||
              form.displayName !== ""
                ? form.displayName
                : undefined,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (imageData)
      updateForm({
        thumbnail: imageData,
      });
  }, [imageData]);

  useEffect(() => {
    (async () => {
      if (data?.user?.edited) {
        await fetch();
        setSaveMessage("Cambios Guardados!");
      }
    })();
  }, [data]);

  return (
    currentUser &&
    form && (
      <div className="flex flex-col ">
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="flex flex-col gap-5 w-full md:w-auto mb-5">
            <p className="text-2xl text-primary-500 font-semibold">
              Nombre de Usuario
            </p>
            <div className="flex flex-col md:flex-row">
              <NoteItInput
                name="displayName"
                type={"text"}
                onChange={onChange}
                error={{ message: errors?.displayName }}
                value={form.displayName}
                className="font-semibold text-primary-500 px-3 h-11 border-2 border-primary-500 outline-primary-600 rounded"
              />
            </div>
          </div>
          <ImageInput displayImage={form?.thumbnail!} cb={setImageData} />
        </div>
        <div className="flex flex-row-reverse mt-8">
          <NoteItButton
            type={BUTTONS.PRIMARY}
            className="w-full md:w-fit md:max-w-xs"
            onClick={handleChange}
          >
            {saveMessage}
          </NoteItButton>
        </div>
      </div>
    )
  );
};
