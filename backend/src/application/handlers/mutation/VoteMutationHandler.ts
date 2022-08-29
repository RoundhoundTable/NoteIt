import { GraphQLError } from "graphql";
import { ApolloContext } from "../../graphql/context";

export const VoteMutationHandler = async (
  _parent: any,
  { noteId, value }: { noteId: string; value: number },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new GraphQLError("Forbidden");

  const vote = await ctx.prisma.vote.upsert({
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
};
