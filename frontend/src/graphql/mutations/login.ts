import { gql } from "@apollo/client";

export const login = gql`
  mutation Login($credentials: LoginMutationInput!) {
    login(credentials: $credentials)
  }
`;
