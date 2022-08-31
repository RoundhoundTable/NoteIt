import { gql } from "@apollo/client";
import { User } from "../../interfaces/Entities";

export interface _userData {
  _user: User | null;
}

export const _user = gql`
  query _user {
    _user {
      username
      displayName
      thumbnail
      createdOn
    }
  }
`;
