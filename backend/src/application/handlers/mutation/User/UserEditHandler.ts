import { PrismaClient, User } from "@prisma/client";
import { v4 } from "uuid";
import { EPictureFolder } from "../../../enumerators/EPictureFolder";
import CloudStorage from "../../../firebase/CloudStorage";
import { IFile } from "../../../interfaces/IFile";
import { EditResult, MutationHandlerFunc } from "../../../types/Handlers";

export const UserEditHandler: MutationHandlerFunc<User, EditResult> = async (
  payload: Pick<User, "displayName" | "thumbnail">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  const uploadThumbnail = async (): Promise<string | undefined> => {
    if (!payload.thumbnail) return undefined;

    const thumbnail: IFile = {
      data: payload.thumbnail,
      name: `${user.username}-${v4()}`,
    };

    await CloudStorage.upload(thumbnail, EPictureFolder.PROFILE_PICTURE);

    return await CloudStorage.getDownloadURL(
      thumbnail.name,
      EPictureFolder.PROFILE_PICTURE
    );
  };
  await schema.validateAsync(payload);

  const edited = await prisma.user.update({
    where: {
      username: user.username,
    },
    data: {
      displayName: payload.displayName ?? undefined,
      thumbnail: await uploadThumbnail(),
    },
  });

  return { edited: Boolean(edited) };
};
