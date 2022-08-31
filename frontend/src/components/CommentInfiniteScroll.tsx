import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  comments,
  commentsData,
  commentsVars,
} from "../graphql/queries/comments";
import { Comment as CommentEntity } from "../interfaces/Entities";
import { Comment as CommentComponent } from "./Comment/Comment";

interface ICommentInfiniteScrollProps {
  variables: commentsVars;
}

export const CommentInfiniteScroll = (props: ICommentInfiniteScrollProps) => {
  const { data, fetchMore } = useQuery<commentsData, commentsVars>(comments, {
    variables: {
      ...props.variables,
    },
  });

  return data ? (
    <InfiniteScroll
      dataLength={data.data.comments.length || 0}
      next={() =>
        fetchMore({
          variables: {
            limit: 6,
            offset: data?.data.comments.length,
          },
        })
      }
      hasMore={data.data.hasMore}
      loader={<h4>Loading...</h4>}
    >
      {data?.data.comments.length === 0 ? (
        <h1 className="text-center p-5">
          La publicacion no tiene ningun comentario, se el primero
        </h1>
      ) : (
        data?.data.comments.map((comment: CommentEntity, key: number) => (
          <CommentComponent data={comment} key={key} />
        ))
      )}
    </InfiniteScroll>
  ) : (
    <></>
  );
};
