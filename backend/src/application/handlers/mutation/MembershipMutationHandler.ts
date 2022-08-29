import { Membership } from "@prisma/client";
import { GraphQLError } from "graphql";
import { EMembershipMutationType } from "../../enumerators/EMutationTypes";
import { ApolloContext } from "../../graphql/context";
import { MutationHandler, MembershipHandlerResult } from "../../types/Handlers";
import { MembershipEditHandler } from "./Membership/MembershipEditHandler";
import { MembershipJoinHandler } from "./Membership/MembershipJoinHandler";
import { MembershiKickHandler } from "./Membership/MembershipKickHandler";
import { MembershipLeaveHandler } from "./Membership/MembershipLeaveHandler";

export const MembershipMutationHandler = (
  _parent: any,
  { type, payload }: { type: EMembershipMutationType; payload: Membership },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new GraphQLError("Forbidden");

  const handlers: MutationHandler<
    EMembershipMutationType,
    Membership,
    MembershipHandlerResult
  > = {
    [EMembershipMutationType.JOIN]: MembershipJoinHandler,
    [EMembershipMutationType.LEAVE]: MembershipLeaveHandler,
    [EMembershipMutationType.KICK]: MembershiKickHandler,
    [EMembershipMutationType.EDIT]: MembershipEditHandler,
  };

  return handlers[type](payload, ctx.prisma, ctx.user);
};
