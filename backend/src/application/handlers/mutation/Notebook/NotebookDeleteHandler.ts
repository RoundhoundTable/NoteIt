import { Notebook, PrismaClient, Roles, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { DeleteResult, MutationHandlerFunc } from "../../../types/Handlers";

export const NotebookDeleteHandler: MutationHandlerFunc<
  Notebook,
  DeleteResult
> = async (
  payload: Pick<Notebook, "name">,
  prisma: PrismaClient,
  user: User
) => {
  const userRole = await prisma.membership.findUnique({
    where: {
      username_notebookName: {
        notebookName: payload.name,
        username: user.username,
      },
    },
  });

  if (userRole.role !== Roles.OWNER) throw new GraphQLError("Forbidden");

  const deleted = await prisma.notebook.delete({
    where: {
      name: payload.name,
    },
  });

  return { deleted: Boolean(deleted) };
};
