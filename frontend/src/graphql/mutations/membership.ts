import { gql } from "@apollo/client";

export const membership = gql`
  mutation Membership(
    $type: MembershipMutationType!
    $payload: MembershipMutationInput!
  ) {
    membership(type: $type, payload: $payload) {
      ... on MembershipJoinResult {
        joined
      }
      ... on MembershipLeaveResult {
        left
      }
      ... on MembershipKickResult {
        kicked
      }
      ... on MembershipEditResult {
        edited
      }
    }
  }
`;
