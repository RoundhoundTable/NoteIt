import { Comment, PrismaClient, User } from "@prisma/client";
import { CreateResult, MutationHandlerFunc } from "../../../types/Handlers";

export const CommentCreateHandler: MutationHandlerFunc<
  Comment,
  CreateResult
> = async (payload: Comment, prisma: PrismaClient, user: User) => {
  const comment = await prisma.comment.create({
    data: {
      content: payload.content,
      noteId: payload.noteId,
      username: user.username,
    },
  });

  return { created: comment.id };
};
