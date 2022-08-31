import { gql } from "@apollo/client";

export const user = gql`
  mutation User($type: UserMutationType!, $payload: UserMutationInput!) {
    user(type: $type, payload: $payload) {
      edited
    }
  }
`;
