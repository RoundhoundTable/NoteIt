import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { ApolloContext } from "../../graphql/context";
import { EUserMutationType } from "../../enumerators/EMutationTypes";
import { MutationHandler, UserHandlerResult } from "../../types/Handlers";
import { UserEditHandler } from "./User/UserEditHandler";
import validation from "../../validation/User";
import Joi from "joi";

export const UserMutationHandler = (
  _parent: any,
  { type, payload }: { type: EUserMutationType; payload: User },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new GraphQLError("Forbidden");

  const handlers: MutationHandler<EUserMutationType, User, UserHandlerResult> =
    {
      [EUserMutationType.EDIT]: UserEditHandler,
    };

  const validationSchema: Record<EUserMutationType, Joi.ObjectSchema> = {
    [EUserMutationType.EDIT]: validation.editSchema,
  };

  return handlers[type](payload, ctx.prisma, ctx.user, validationSchema[type]);
};
