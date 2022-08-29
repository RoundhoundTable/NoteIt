import { Note, PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { DeleteResult, MutationHandlerFunc } from "../../../types/Handlers";

export const NoteDeleteHandler: MutationHandlerFunc<
  Note,
  DeleteResult
> = async (payload: Pick<Note, "id">, prisma: PrismaClient, user: User) => {
  const note = await prisma.note.findUnique({
    where: {
      id: payload.id,
    },
    include: {
      user: true,
    },
  });

  if (user.username !== note.user.username) throw new GraphQLError("Forbidden");

  const deleted = await prisma.note.delete({
    where: {
      id: payload.id,
    },
  });

  return { deleted: Boolean(deleted) };
};
