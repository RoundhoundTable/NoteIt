import { gql } from "@apollo/client";

export const comment = gql`
  mutation Mutation(
    $type: CommentMutationType!
    $payload: CommentMutationInput!
  ) {
    comment(type: $type, payload: $payload) {
      ... on CommentCreateResult {
        created
      }
      ... on CommentDeleteResult {
        deleted
      }
    }
  }
`;
