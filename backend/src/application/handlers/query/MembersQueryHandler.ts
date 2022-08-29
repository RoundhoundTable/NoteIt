import { Membership, Roles } from "@prisma/client";
import { GraphQLError } from "graphql";
import { ApolloContext } from "../../graphql/context";
import { Pagination } from "../../types/Pagination";

export const MembersQueryHanlder = async (
  _parent: any,
  { notebook }: { notebook: string },
  ctx: ApolloContext
) => {
  const roleOrder = Object.values(Roles);
  const memberships = await ctx.prisma.membership.findMany({
    where: {
      notebookName: notebook,
    },
    include: {
      user: true,
      notebook: true,
    },
  });

  memberships.sort(
    (a, b) => roleOrder.indexOf(b.role) - roleOrder.indexOf(a.role)
  );
  return memberships;
};
