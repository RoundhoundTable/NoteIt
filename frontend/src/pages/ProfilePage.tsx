import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NoteInfiniteScroll } from "../components/InfiniteScroll";
import { ProfileHeader } from "../components/ProfileHeader";
import { notes, notesData, notesVars } from "../graphql/queries/notes";
import { user, userData, userVars } from "../graphql/queries/user";
import { ErrorPage } from "./ErrorPage";

export const ProfilePage = () => {
  const { username } = useParams();
  const apollo = useApolloClient();
  const { data: { user: _user } = {}, error: userError } = useQuery<
    userData,
    userVars
  >(user, {
    variables: {
      username: username!,
    },
  });
  const { data: { data: _data } = {}, fetchMore } = useQuery<
    notesData,
    notesVars
  >(notes, {
    variables: {
      username,
      limit: 6,
      offset: 0,
    },
  });

  useEffect(() => {
    apollo.cache.reset();
  }, []);

  const fetchMoreData = async () => {
    await fetchMore({
      variables: {
        limit: 6,
        offset: _data?.notes.length,
      },
    });
  };

  if (userError)
    return (
      <ErrorPage
        title="Usuario no encontrado."
        message="Lo sentimos, este usuario no existe"
      />
    );

  return (
    <div>
      {_user && <ProfileHeader {..._user} />}
      <div className="flex flex-col justify-center items-center mt-4 mb-16 p-8 md:p-0">
        <div className="flex flex-col justify-center items-center w-screen mb-16 px-8 md:p-0 z-10">
          {_data && <NoteInfiniteScroll fetchMore={fetchMoreData} {..._data} />}
        </div>
      </div>
    </div>
  );
};
