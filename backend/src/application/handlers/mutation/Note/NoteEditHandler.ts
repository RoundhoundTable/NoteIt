import { Note, PrismaClient, User } from "@prisma/client";
import { EditResult, MutationHandlerFunc } from "../../../types/Handlers";

export const NoteEditHandler: MutationHandlerFunc<Note, EditResult> = async (
  payload: Pick<Note, "content" | "id">,
  prisma: PrismaClient,
  user: User
) => {
  const note = await prisma.note.update({
    where: {
      id: payload.id,
    },
    data: {
      ...payload,
    },
  });

  return { edited: Boolean(note) };
};
