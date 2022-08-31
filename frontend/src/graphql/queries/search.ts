import { gql } from "@apollo/client";
import { SearchQueryResult } from "../../types/Results";

export interface searchData {
  search: SearchQueryResult;
}

export interface searchVars {
  query: string;
  limit: number;
  offset: number;
}

export const search = gql`
  query Query($query: String!, $limit: Int!, $offset: Int!) {
    search(query: $query, limit: $limit, offset: $offset) {
      ... on User {
        __typename
        username
        displayName
        thumbnail
        createdOn
      }
      ... on Notebook {
        __typename
        name
        thumbnail
        members
        createdOn
        description
        joinedByUser
        role
      }
    }
  }
`;
