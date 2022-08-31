import { Comment, PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { DeleteResult, MutationHandlerFunc } from "../../../types/Handlers";
import { deleteSchema } from "../../../validation/Comment";
import { formatError } from "../../../validation/formatError";

export const CommentDeleteHandler: MutationHandlerFunc<
  Comment,
  DeleteResult
> = async (
  payload: Pick<Comment, "id">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  try {
    await deleteSchema.validateAsync(payload, { abortEarly: false });

    const comment = await prisma.comment.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!comment) throw new GraphQLError("Not Found");
    if (user.username !== comment.username) throw new GraphQLError("Forbidden");

    const deleted = await prisma.comment.delete({
      where: {
        id: payload.id,
      },
    });

    return { deleted: Boolean(deleted) };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
