import { Membership, PrismaClient, Roles, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import {
  MutationHandlerFunc,
  JoinResult,
  KickResult,
} from "../../../types/Handlers";

export const MembershiKickHandler: MutationHandlerFunc<
  Membership,
  KickResult
> = async (
  payload: Omit<Membership, "role">,
  prisma: PrismaClient,
  user: User
) => {
  const currentMembership = await prisma.membership.findUnique({
    where: {
      username_notebookName: {
        notebookName: payload.notebookName,
        username: user.username,
      },
    },
  });
  const target = await prisma.membership.findUnique({
    where: {
      username_notebookName: {
        notebookName: payload.notebookName,
        username: payload.username,
      },
    },
  });

  if (
    currentMembership.role === Roles.USER ||
    (currentMembership.role === Roles.MODERATOR && target.role === Roles.OWNER)
  )
    throw new GraphQLError("Forbidden");

  const kicked = await prisma.membership.delete({
    where: {
      username_notebookName: {
        ...payload,
      },
    },
  });

  return { kicked: Boolean(kicked) };
};
