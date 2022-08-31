import { gql } from "@apollo/client";
import { Notebook } from "../../interfaces/Entities";

export interface notebookData {
  notebook: Notebook;
}

export interface notebookVars {
  name: string;
}

export const notebook = gql`
  query Notebook($name: String!) {
    notebook(name: $name) {
      name
      thumbnail
      createdOn
      description
      members
      joinedByUser
      role
    }
  }
`;
