import { Note, PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { CreateResult, MutationHandlerFunc } from "../../../types/Handlers";
import { formatError } from "../../../validation/formatError";

export const NoteCreateHandler: MutationHandlerFunc<
  Note,
  CreateResult
> = async (
  payload: Omit<Note, "id">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });

    const note = await prisma.note.create({
      data: {
        ...payload,
        username: user.username,
      },
    });

    return { created: note.id };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
