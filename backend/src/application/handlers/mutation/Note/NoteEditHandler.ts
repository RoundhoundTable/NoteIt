import { Note, PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { EditResult, MutationHandlerFunc } from "../../../types/Handlers";
import { formatError } from "../../../validation/formatError";

export const NoteEditHandler: MutationHandlerFunc<Note, EditResult> = async (
  payload: Pick<Note, "content" | "id">,
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
      include: { user: true },
    });

    if (!note) throw new GraphQLError("Not Found");
    if (user.username !== note.user.username)
      throw new GraphQLError("Forbidden");

    const edited = await prisma.note.update({
      where: {
        id: payload.id,
      },
      data: {
        ...payload,
      },
    });

    return { edited: Boolean(edited) };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
