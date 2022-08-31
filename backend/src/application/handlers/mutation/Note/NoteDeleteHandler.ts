import { Note, PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { DeleteResult, MutationHandlerFunc } from "../../../types/Handlers";
import { formatError } from "../../../validation/formatError";

export const NoteDeleteHandler: MutationHandlerFunc<
  Note,
  DeleteResult
> = async (
  payload: Pick<Note, "id">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });

    const note = await prisma.note.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        user: true,
      },
    });

    if (!note) throw new GraphQLError("Not Found");
    if (user.username !== note.user.username)
      throw new GraphQLError("Forbidden");

    const deleted = await prisma.note.delete({
      where: {
        id: payload.id,
      },
    });

    return { deleted: Boolean(deleted) };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
