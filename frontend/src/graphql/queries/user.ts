import { gql } from "@apollo/client";
import { User } from "../../interfaces/Entities";

export interface userData {
  user: User;
}

export interface userVars {
  username: string;
}

export const user = gql`
  query User($username: String!) {
    user(username: $username) {
      username
      displayName
      thumbnail
      createdOn
    }
  }
`;
