import { Notebook, PrismaClient, Roles, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";
import { EPictureFolder } from "../../../enumerators/EPictureFolder";
import CloudStorage from "../../../firebase/CloudStorage";
import { IFile } from "../../../interfaces/IFile";
import { CreateResult, MutationHandlerFunc } from "../../../types/Handlers";
import { formatError } from "../../../validation/formatError";

export const NotebookCreateHandler: MutationHandlerFunc<
  Notebook,
  CreateResult
> = async (
  payload: Omit<Notebook, "createdOn">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  try {
    const uploadThumbnail = async (): Promise<string | undefined> => {
      if (!payload.thumbnail) return undefined;

      const thumbnail: IFile = {
        data: payload.thumbnail,
        name: `${payload.name}-${v4()}`,
      };

      await CloudStorage.upload(thumbnail, EPictureFolder.NOTEBOOK_THUMBNAIL);

      return await CloudStorage.getDownloadURL(
        thumbnail.name,
        EPictureFolder.NOTEBOOK_THUMBNAIL
      );
    };

    await schema.validateAsync(payload, { abortEarly: false });

    const exists = await prisma.notebook.findUnique({
      where: {
        name: payload.name,
      },
    });

    if (exists) throw new GraphQLError("Already Exists");

    const notebook = await prisma.notebook.create({
      data: {
        ...payload,
        thumbnail: await uploadThumbnail(),
      },
    });

    await prisma.membership.create({
      data: {
        role: Roles.OWNER,
        notebookName: notebook.name,
        username: user.username,
      },
    });

    return { created: notebook.name };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
