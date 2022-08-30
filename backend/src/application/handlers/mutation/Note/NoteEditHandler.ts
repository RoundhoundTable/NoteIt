import { Note, PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { EditResult, MutationHandlerFunc } from "../../../types/Handlers";

export const NoteEditHandler: MutationHandlerFunc<Note, EditResult> = async (
  payload: Pick<Note, "content" | "id">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  await schema.validateAsync(payload);

  const note = await prisma.note.findUnique({
    where: {
      id: payload.id,
    },
    include: { user: true },
  });

  if (!note) throw new GraphQLError("Not Found");
  if (user.username !== note.user.username) throw new GraphQLError("Forbidden");

  const edited = await prisma.note.update({
    where: {
      id: payload.id,
    },
    data: {
      ...payload,
    },
  });

  return { edited: Boolean(edited) };
};
