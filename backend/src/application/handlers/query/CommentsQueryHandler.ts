import { ApolloContext } from "../../graphql/context";
import { Pagination } from "../../types/Pagination";

export const CommentsQueryHandler = async (
  _parent: any,
  { noteId, ...pagination }: { noteId: string; limit: number; offset: number },
  ctx: ApolloContext
) => {
  const comments = await ctx.prisma.comment.findMany({
    where: {
      noteId: noteId,
    },
    include: {
      user: true,
      note: true,
    },
    orderBy: {
      createdOn: "desc",
    },
    take: pagination ? pagination.limit : 6,
    skip: pagination ? pagination.offset : 0,
  });

  const quantity = await ctx.prisma.comment.count({
    where: {
      noteId: noteId,
    },
  });

  const hasMore = Boolean(quantity - (pagination.offset + comments.length));

  return {hasMore, comments};
};
