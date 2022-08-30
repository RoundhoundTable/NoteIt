import { Membership, PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { LeaveResult, MutationHandlerFunc } from "../../../types/Handlers";

export const MembershipLeaveHandler: MutationHandlerFunc<
  Membership,
  LeaveResult
> = async (
  payload: Pick<Membership, "notebookName">,
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

  const membership = await prisma.membership.findUnique({
    where: {
      username_notebookName: {
        notebookName: payload.notebookName,
        username: user.username,
      },
    },
  });

  if (!membership) throw new GraphQLError("Not found");

  const deleted = await prisma.membership.delete({
    where: {
      username_notebookName: {
        notebookName: payload.notebookName,
        username: user.username,
      },
    },
  });

  return { left: Boolean(deleted) };
};
