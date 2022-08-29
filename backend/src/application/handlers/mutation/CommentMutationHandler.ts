import { Comment, Note } from "@prisma/client";
import { GraphQLError } from "graphql";
import { ECommentMutationType } from "../../enumerators/EMutationTypes";
import { ApolloContext } from "../../graphql/context";
import { MutationHandler, CommentHandlerResult } from "../../types/Handlers";
import { CommentCreateHandler } from "./Comment/CommentCreateHandler";
import { CommentDeleteHandler } from "./Comment/CommentDeleteHandler";

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

  return handlers[type](payload, ctx.prisma, ctx.user);
};
