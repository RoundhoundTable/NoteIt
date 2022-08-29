import { GraphQLError } from "graphql";
import { ApolloContext } from "../../graphql/context";
import { Pagination } from "../../types/Pagination";

export const FeedQueryHanlder = async (
  _parent: any,
  { ...pagination }: { limit: number; offset: number },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new GraphQLError("Forbidden");

  const memberships = await ctx.prisma.membership.findMany({
    where: {
      username: {
        equals: ctx.user.username,
      },
    },
  });

  const notes = await ctx.prisma.note.findMany({
    where: {
      notebookName: {
        in: memberships.map((membership) => membership.notebookName),
      },
    },
    include: {
      notebook: true,
      user: true,
    },
    orderBy: {
      createdOn: "desc",
    },
    take: pagination ? pagination.limit : 6,
    skip: pagination ? pagination.offset : 0,
  });

  return notes;
};
