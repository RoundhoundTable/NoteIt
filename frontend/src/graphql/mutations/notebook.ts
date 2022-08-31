import { gql } from "@apollo/client";

export const notebook = gql`
  mutation Mutation(
    $type: NotebookMutationType!
    $payload: NotebookMutationInput!
  ) {
    notebook(type: $type, payload: $payload) {
      ... on NotebookCreateResult {
        created
      }
      ... on NotebookEditResult {
        edited
      }
      ... on NotebookDeleteResult {
        deleted
      }
    }
  }
`;
