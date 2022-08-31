import { gql } from "@apollo/client";
import { Note } from "../../interfaces/Entities";

export interface notesData {
  data: {
    hasMore: boolean;
    notes: Note[];
  };
}

export interface notesVars {
  username?: string;
  notebook?: string;
  limit: number;
  offset: number;
}

export const notes = gql`
  query Query(
    $username: String
    $notebook: String
    $limit: Int!
    $offset: Int!
  ) {
    data: notes(
      username: $username
      notebook: $notebook
      limit: $limit
      offset: $offset
    ) {
      hasMore
      notes {
        id
        content
        title
        createdOn
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
