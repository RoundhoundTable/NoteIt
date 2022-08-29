import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { ApolloContext } from "../../graphql/context";
import {
  ENoteMutationType,
  EUserMutationType,
} from "../../enumerators/EMutationTypes";
import { MutationHandler, UserHandlerResult } from "../../types/Handlers";
import { UserEditHandler } from "./User/UserEditHandler";

export const UserMutationHandler = (
  _parent: any,
  { type, payload }: { type: EUserMutationType; payload: User },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new GraphQLError("Forbidden");

  const handlers: MutationHandler<EUserMutationType, User, UserHandlerResult> =
    {
      [ENoteMutationType.EDIT]: UserEditHandler,
    };

  return handlers[type](payload, ctx.prisma, ctx.user);
};
