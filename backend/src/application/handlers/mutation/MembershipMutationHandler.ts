import { Membership } from "@prisma/client";
import { GraphQLError } from "graphql";
import { EMembershipMutationType } from "../../enumerators/EMutationTypes";
import { ApolloContext } from "../../graphql/context";
import { MutationHandler, MembershipHandlerResult } from "../../types/Handlers";
import { MembershipEditHandler } from "./Membership/MembershipEditHandler";
import { MembershipJoinHandler } from "./Membership/MembershipJoinHandler";
import { MembershiKickHandler } from "./Membership/MembershipKickHandler";
import { MembershipLeaveHandler } from "./Membership/MembershipLeaveHandler";
import Joi from "joi";
import validation from "../../validation/Membership";

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

  const validationSchema: Record<EMembershipMutationType, Joi.ObjectSchema> = {
    [EMembershipMutationType.JOIN]: validation.joinSchema,
    [EMembershipMutationType.LEAVE]: validation.leaveSchema,
    [EMembershipMutationType.KICK]: validation.kickSchema,
    [EMembershipMutationType.EDIT]: validation.editSchema,
  };

  return handlers[type](payload, ctx.prisma, ctx.user, validationSchema[type]);
};
