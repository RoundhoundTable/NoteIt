import { ApolloContext } from "../../graphql/context";

export const NoteQueryHandler = async (
  _parent,
  { id }: { id: string },
  ctx: ApolloContext
) => {
  const note = await ctx.prisma.note.findUnique({
    where: {
      id: id,
    },
    include: {
      notebook: true,
      user: true,
    },
  });

  return note;
};
