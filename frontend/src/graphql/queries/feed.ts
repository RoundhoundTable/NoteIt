import { gql } from "@apollo/client";
import { Note } from "../../interfaces/Entities";

export interface feedData {
  feed: {
    hasMore: boolean;
    notes: Note[];
  };
}

export interface feedVars {
  limit: number;
  offset: number;
}

export const feed = gql`
  query Query($limit: Int!, $offset: Int!) {
    feed(limit: $limit, offset: $offset) {
      hasMore
      notes {
        id
        content
        createdOn
        title
        user {
          username
          displayName
          thumbnail
        }
        notebook {
          name
        }
        score
        userVote
        isOwner
      }
    }
  }
`;
