import { useQuery } from "@apollo/client";
import { NoteInfiniteScroll } from "../components/InfiniteScroll";
import { useAuth } from "../context/AuthProvider";
import { feed, feedData, feedVars } from "../graphql/queries/feed";

export const MainPage = () => {
  const { currentUser } = useAuth();
  const { data: { feed: _feed } = {}, fetchMore } = useQuery<
    feedData,
    feedVars
  >(feed, {
    variables: {
      limit: 6,
      offset: 0,
    },
  });

  const fetchMoreData = async () => {
    await fetchMore({
      variables: {
        limit: 6,
        offset: _feed?.notes.length,
      },
    });
  };

  return currentUser ? (
    <div className="flex flex-col justify-center items-center w-screen mb-16 px-8 md:p-0 z-10">
      {_feed && <NoteInfiniteScroll fetchMore={fetchMoreData} {..._feed} />}
    </div>
  ) : (
    <h2>Debes iniciar sesion para tener un feed</h2>
  );
};
export {};
