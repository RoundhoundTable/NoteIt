import { ApolloContext } from "../../graphql/context";

export const JoinedQueryHandler = async (
  _parent: any,
  _: never,
  ctx: ApolloContext
) => {
  if (!ctx.user) return null;

  const membership = await ctx.prisma.membership.findMany({
    where: {
      username: ctx.user.username,
    },
    include: {
      notebook: true,
      user: true,
    },
  });

  return membership;
};
