import { ApolloContext } from "../../graphql/context";

export const CurrentUserQueryHandler = async (
  _parent: any,
  _: never,
  ctx: ApolloContext
) => {
  if (!ctx.user) return null;
  return ctx.user;
};
