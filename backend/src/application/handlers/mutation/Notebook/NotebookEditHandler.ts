import { Notebook, PrismaClient, Roles, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";
import { EPictureFolder } from "../../../enumerators/EPictureFolder";
import CloudStorage from "../../../firebase/CloudStorage";
import { IFile } from "../../../interfaces/IFile";
import { EditResult, MutationHandlerFunc } from "../../../types/Handlers";
import { formatError } from "../../../validation/formatError";

export const NotebookEditHandler: MutationHandlerFunc<
  Notebook,
  EditResult
> = async (
  payload: Pick<Notebook, "description" | "thumbnail" | "name">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });

    const notebook = await prisma.notebook.findUnique({
      where: {
        name: payload.name,
      },
    });

    if (!notebook) throw new GraphQLError("Not Found");

    const userRole = await prisma.membership.findUnique({
      where: {
        username_notebookName: {
          notebookName: payload.name,
          username: user.username,
        },
      },
    });

    if (userRole.role !== Roles.OWNER) throw new GraphQLError("Forbidden");

    const edited = await prisma.notebook.update({
      data: {
        description: payload.description ?? undefined,
        thumbnail: payload.thumbnail
          ? await CloudStorage.upload(
              payload.thumbnail,
              "notebooks",
              payload.name
            )
          : undefined,
      },
      where: {
        name: payload.name,
      },
    });

    return { edited: Boolean(edited) };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
