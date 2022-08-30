import { Comment, Note } from "@prisma/client";
import { GraphQLError } from "graphql";
import { ECommentMutationType } from "../../enumerators/EMutationTypes";
import { ApolloContext } from "../../graphql/context";
import { MutationHandler, CommentHandlerResult } from "../../types/Handlers";
import { CommentCreateHandler } from "./Comment/CommentCreateHandler";
import { CommentDeleteHandler } from "./Comment/CommentDeleteHandler";
import validation from "../../validation/Comment";
import Joi from "joi";

export const CommentMutationHandler = (
  _parent: any,
  { type, payload }: { type: ECommentMutationType; payload: Comment },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new GraphQLError("Forbidden");

  const handlers: MutationHandler<
    ECommentMutationType,
    Comment,
    CommentHandlerResult
  > = {
    [ECommentMutationType.CREATE]: CommentCreateHandler,
    [ECommentMutationType.DELETE]: CommentDeleteHandler,
  };

  const validationSchema: Record<ECommentMutationType, Joi.ObjectSchema> = {
    [ECommentMutationType.CREATE]: validation.createSchema,
    [ECommentMutationType.DELETE]: validation.deleteSchema,
  };

  return handlers[type](payload, ctx.prisma, ctx.user, validationSchema[type]);
};
