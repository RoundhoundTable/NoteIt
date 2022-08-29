import { ApolloContext } from "../../graphql/context";
import { Pagination } from "../../types/Pagination";

export const NotesQueryHandler = async (
  _parent,
  {
    username,
    notebook,
    ...pagination
  }: { username?: string; notebook?: string; limit: number; offset: number },
  ctx: ApolloContext
) => {
  const notes = await ctx.prisma.note.findMany({
    where: {
      username: username ? username : undefined,
      notebookName: notebook ? notebook : undefined,
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
