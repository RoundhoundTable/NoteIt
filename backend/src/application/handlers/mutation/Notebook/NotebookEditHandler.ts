import { Notebook, PrismaClient, Roles, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";
import { EPictureFolder } from "../../../enumerators/EPictureFolder";
import CloudStorage from "../../../firebase/CloudStorage";
import { IFile } from "../../../interfaces/IFile";
import { EditResult, MutationHandlerFunc } from "../../../types/Handlers";

export const NotebookEditHandler: MutationHandlerFunc<
  Notebook,
  EditResult
> = async (
  payload: Pick<Notebook, "description" | "thumbnail" | "name">,
  prisma: PrismaClient,
  user: User
) => {
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
      thumbnail: await uploadThumbnail(),
    },
    where: {
      name: payload.name,
    },
  });

  return { edited: Boolean(edited) };
};
