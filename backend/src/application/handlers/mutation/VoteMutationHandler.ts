import { GraphQLError } from "graphql";
import { ApolloContext } from "../../graphql/context";
import { formatError } from "../../validation/formatError";
import { voteSchema } from "../../validation/Vote";

export const VoteMutationHandler = async (
  _parent: any,
  { noteId, value }: { noteId: string; value: number },
  ctx: ApolloContext
) => {
  try {
    if (!ctx.user) throw new GraphQLError("Forbidden");

    await voteSchema.validateAsync({ noteId, value });

    const note = await ctx.prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!note) throw new GraphQLError("Not found");

    await ctx.prisma.vote.upsert({
      where: {
        username_noteId: {
          username: ctx.user.username,
          noteId,
        },
      },
      create: {
        value,
        noteId,
        username: ctx.user.username,
      },
      update: {
        value,
      },
    });

    const score = await ctx.prisma.vote.aggregate({
      _sum: {
        value: true,
      },
      where: {
        noteId,
      },
    });

    return score._sum.value;
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
