import { gql } from "@apollo/client";
import { Comment } from "../../interfaces/Entities";

export interface commentsData {
  data: {
    hasMore: boolean;
    comments: Comment[];
  };
}

export interface commentsVars {
  noteId: string;
  limit: number;
  offset: number;
}

export const comments = gql`
  query Comments($noteId: String!, $limit: Int!, $offset: Int!) {
    data: comments(noteId: $noteId, limit: $limit, offset: $offset) {
      hasMore
      comments {
        id
        content
        createdOn
        user {
          username
          displayName
          thumbnail
        }
        isOwner
      }
    }
  }
`;
