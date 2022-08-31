import { gql } from "@apollo/client";

export const vote = gql`
  mutation Vote($noteId: String!, $value: Int!) {
    vote(noteId: $noteId, value: $value)
  }
`;
