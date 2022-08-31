import { Membership, PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { MutationHandlerFunc, JoinResult } from "../../../types/Handlers";
import { formatError } from "../../../validation/formatError";

export const MembershipJoinHandler: MutationHandlerFunc<
  Membership,
  JoinResult
> = async (
  payload: Omit<Membership, "username">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });

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
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
