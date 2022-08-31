import { gql } from "@apollo/client";
import { Note } from "../../interfaces/Entities";

export interface noteData {
  note: Note;
}

export interface noteVars {
  noteId: string;
}

export const note = gql`
  query Note($noteId: String!) {
    note(id: $noteId) {
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
`;
