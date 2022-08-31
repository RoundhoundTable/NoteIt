import { gql } from "@apollo/client";
import { Membership } from "../../interfaces/Entities";

export interface membersData {
  members: Pick<Membership, "role" | "user">[];
}

export interface membersVars {
  notebook: string;
}

export const members = gql`
  query Query($notebook: String!) {
    members(notebook: $notebook) {
      role
      user {
        username
        displayName
        thumbnail
        createdOn
      }
    }
  }
`;
