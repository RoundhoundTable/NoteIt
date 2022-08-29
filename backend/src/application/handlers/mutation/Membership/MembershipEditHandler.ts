import { Membership, PrismaClient, Roles, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { MutationHandlerFunc, EditResult } from "../../../types/Handlers";

export const MembershipEditHandler: MutationHandlerFunc<
  Membership,
  EditResult
> = async (payload: Membership, prisma: PrismaClient, user: User) => {
  const current = await prisma.membership.findUnique({
    where: {
      username_notebookName: {
        notebookName: payload.notebookName,
        username: user.username,
      },
    },
  });

  if (current.role !== Roles.OWNER) throw new GraphQLError("Forbidden");

  const membership = await prisma.membership.update({
    where: {
      username_notebookName: {
        notebookName: payload.notebookName,
        username: payload.username,
      },
    },
    data: {
      role: payload.role,
    },
  });

  return { edited: Boolean(membership) };
};
