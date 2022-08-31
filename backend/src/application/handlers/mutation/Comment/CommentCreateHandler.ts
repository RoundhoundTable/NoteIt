import { Comment, PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { CreateResult, MutationHandlerFunc } from "../../../types/Handlers";
import { createSchema } from "../../../validation/Comment";
import { formatError } from "../../../validation/formatError";

export const CommentCreateHandler: MutationHandlerFunc<
  Comment,
  CreateResult
> = async (payload: Comment, prisma: PrismaClient, user: User, schema) => {
  try {
    await createSchema.validateAsync(payload, { abortEarly: false });

    const comment = await prisma.comment.create({
      data: {
        content: payload.content,
        noteId: payload.noteId,
        username: user.username,
      },
    });

    return { created: comment.id };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
