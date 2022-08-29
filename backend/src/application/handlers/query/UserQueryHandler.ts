import { ApolloContext } from "../../graphql/context";

export const UserQueryHandler = async (
  _parent,
  { username }: { username: string },
  ctx: ApolloContext
) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};
