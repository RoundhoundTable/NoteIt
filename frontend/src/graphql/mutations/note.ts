import { gql } from "@apollo/client";

export const note = gql`
  mutation Note($type: NoteMutationType!, $payload: NoteMutationInput!) {
    note(type: $type, payload: $payload) {
      ... on NoteCreateResult {
        created
      }
      ... on NoteEditResult {
        edited
      }
      ... on NoteDeleteResult {
        deleted
      }
    }
  }
`;
