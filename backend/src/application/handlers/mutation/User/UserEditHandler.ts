import { PrismaClient, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";
import { EPictureFolder } from "../../../enumerators/EPictureFolder";
import CloudStorage from "../../../firebase/CloudStorage";
import { IFile } from "../../../interfaces/IFile";
import { EditResult, MutationHandlerFunc } from "../../../types/Handlers";
import { formatError } from "../../../validation/formatError";

export const UserEditHandler: MutationHandlerFunc<User, EditResult> = async (
  payload: Pick<User, "displayName" | "thumbnail">,
  prisma: PrismaClient,
  user: User,
  schema
) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });

    const edited = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        displayName: payload.displayName ?? undefined,
        thumbnail: payload.thumbnail
          ? await CloudStorage.upload(payload.thumbnail, "users", user.username)
          : undefined,
      },
    });

    return { edited: Boolean(edited) };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
