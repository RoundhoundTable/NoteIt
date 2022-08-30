import { Membership, PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { MutationHandlerFunc, JoinResult } from "../../../types/Handlers";

export const MembershipJoinHandler: MutationHandlerFunc<
  Membership,
  JoinResult
> = async (
  payload: Omit<Membership, "username">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  await schema.validateAsync(payload);

  const notebook = await prisma.notebook.findUnique({
    where: {
      name: payload.notebookName,
    },
  });

  if (!notebook) throw new GraphQLError("Not found");

  const membership = await prisma.membership.create({
    data: {
      ...payload,
      username: user.username,
    },
  });

  return { joined: Boolean(membership) };
};
