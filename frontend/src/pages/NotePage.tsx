import { useApolloClient, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { NoteView } from "../components/Note/NoteView";
import { CommentInfiniteScroll } from "../components/CommentInfiniteScroll";
import { useEffect } from "react";
import { CommentContainer } from "../components/CommentContainer";
import { note, noteData, noteVars } from "../graphql/queries/note";
import { commentsVars } from "../graphql/queries/comments";

export const NotePage = () => {
  const apolloClient = useApolloClient();
  const { id } = useParams();
  const { data } = useQuery<noteData, noteVars>(note, {
    variables: {
      noteId: id!,
    },
  });

  const queryVariables: commentsVars = {
    noteId: id!,
    limit: 5,
    offset: 0,
  };

  useEffect(() => {
    apolloClient.cache.reset();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {data && <NoteView {...data.note} />}
      <CommentContainer noteId={id!}>
        <CommentInfiniteScroll variables={queryVariables} />
      </CommentContainer>
    </div>
  );
};
