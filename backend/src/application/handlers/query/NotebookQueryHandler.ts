import { ApolloContext } from "../../graphql/context";

export const NotebookQueryHandler = async (
  _parent: any,
  { name }: { name: string },
  ctx: ApolloContext
) => {
  const notebook = await ctx.prisma.notebook.findUnique({
    where: {
      name,
    },
  });

  return notebook;
};
