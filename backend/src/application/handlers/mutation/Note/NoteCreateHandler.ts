import { Note, PrismaClient, User } from "@prisma/client";
import { CreateResult, MutationHandlerFunc } from "../../../types/Handlers";

export const NoteCreateHandler: MutationHandlerFunc<
  Note,
  CreateResult
> = async (
  payload: Omit<Note, "id">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  await schema.validateAsync(payload);

  const note = await prisma.note.create({
    data: {
      ...payload,
      username: user.username,
    },
  });

  return { created: note.id };
};
