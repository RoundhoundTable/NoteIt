import { NotebookHeader } from "../components/NotebookHeader";
import { NotebookDetails } from "../components/NotebookDetails";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { ErrorPage } from "./ErrorPage";
import {
  notebook,
  notebookData,
  notebookVars,
} from "../graphql/queries/notebook";
import { notes, notesData, notesVars } from "../graphql/queries/notes";
import { notebook as notebookMutation } from "../graphql/mutations/notebook";
import { ENotebookMutationType } from "../enums/EMutationTypes";
import { NoteInfiniteScroll } from "../components/InfiniteScroll";

export const NoteBookPages = () => {
  const { name } = useParams();
  const [editMode, setEditMode] = useState<boolean>(false);
  const apollo = useApolloClient();
  const [EditNotebook, { data: _notebook }] = useMutation(notebookMutation);
  const [imageData, setImageData] = useState(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const navigateTo = useNavigate();
  const { data, error: notebookError } = useQuery<notebookData, notebookVars>(
    notebook,
    {
      variables: {
        name: name!,
      },
    }
  );
  const { data: { data: _data } = {}, fetchMore } = useQuery<
    notesData,
    notesVars
  >(notes, {
    variables: {
      notebook: name,
      limit: 6,
      offset: 0,
    },
  });

  const fetchMoreData = async () => {
    await fetchMore({
      variables: {
        limit: 6,
        offset: _data?.notes.length,
      },
    });
  };

  const editModeToggler = () => setEditMode(!editMode);

  const submit = () => {
    EditNotebook({
      variables: {
        type: ENotebookMutationType.EDIT,
        payload: {
          name: data?.notebook.name,
          description: description,
          thumbnail: imageData,
        },
      },
    });
  };

  useEffect(() => {
    apollo.cache.reset();
  }, []);

  useEffect(() => {
    if (data) setDescription(data.notebook.description);
  }, [data]);

  useEffect(() => {
    if (_notebook?.notebook?.edited) navigateTo(0);
  }, [_notebook]);

  if (notebookError)
    return (
      <ErrorPage
        title="Notebook no encontrado."
        message="Lo sentimos, este notebook no existe"
      />
    );

  return (
    <div>
      {data && (
        <NotebookHeader
          data={data.notebook}
          isEditMode={editMode}
          editModeToggler={editModeToggler}
          setImageData={setImageData}
          submitChanges={submit}
        />
      )}
      <div className="flex flex-col-reverse md:flex-row align-middle justify-center">
        <div className="w-full md:w-2/3">
          {_data && <NoteInfiniteScroll fetchMore={fetchMoreData} {..._data} />}
        </div>
        {data && (
          <NotebookDetails
            data={data.notebook}
            description={description!}
            setDescription={setDescription}
            isEditMode={editMode}
          />
        )}
      </div>
    </div>
  );
};
