import { gql } from "@apollo/client";

export const register = gql`
  mutation Mutation($credentials: RegisterMutationInput!) {
    register(credentials: $credentials)
  }
`;
