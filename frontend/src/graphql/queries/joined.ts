import { gql } from "@apollo/client";
import { Membership } from "../../interfaces/Entities";

export interface joinedData {
  joined: Pick<Membership, "notebook">[];
}

export const joined = gql`
  query Joined {
    joined {
      notebook {
        name
      }
    }
  }
`;
