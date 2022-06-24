import { Arg, Mutation, Resolver } from "type-graphql";
import { Services } from "../../application/services";
import {
  ChangeRole,
  CreateMembership,
  DeleteMembership,
} from "../../application/types/Membership";

@Resolver()
export class MembershipResolver {
  @Mutation(() => Boolean)
  async joinNotebook(
    @Arg("membershipPayload") membershipPayload: CreateMembership
  ) {
    return (await Services.Membership.create(membershipPayload)) ? true : false;
  }

  @Mutation(() => Boolean)
  async changeRole(@Arg("membershipPayload") membershipPayload: ChangeRole) {
    return (await Services.Membership.changeRole(
      membershipPayload.username,
      membershipPayload.notebookName,
      membershipPayload.role
    ))
      ? true
      : false;
  }

  @Mutation(() => Boolean)
  async leaveNotebook(
    @Arg("membershipPayload") membershipPayload: DeleteMembership
  ) {
    return (await Services.Membership.create(membershipPayload)) ? false : true;
  }
}
