import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import CloudStorage from "../../application/CloudStorage";
import { IContext } from "../../application/interfaces/IContext";
import { IFile } from "../../application/interfaces/IFile";
import { IPayload } from "../../application/interfaces/IPayload";
import { isAuth } from "../../application/middlewares/isAuth";
import { Services } from "../../application/services";
import { Settings } from "../../application/types/User";
import { Entities } from "../../domain/entities";
import { v4 } from "uuid";
import { EFileStringFormat } from "../../application/enumerators/EFileStringFormat";

@ObjectType()
class UpdateSettingsResponse {
  @Field({ nullable: true })
  thumbnail: string;

  @Field({ nullable: true })
  displayName: string;
}

@Resolver(() => Entities.User)
export class UserResolver {
  @Mutation(() => UpdateSettingsResponse)
  @UseMiddleware(isAuth)
  async updateSettings(
    @Arg("settings") settings: Settings,
    @Ctx() context: IContext
  ) {
    if (settings.thumbnail) {
      const thumbnailFile: IFile = {
        data: settings.thumbnail,
        name: `${context.payload.username}-${v4()}`,
      };

      await CloudStorage.upload(thumbnailFile, EFileStringFormat.dataUrl);
      const imageUrl = await CloudStorage.getDownloadURL(thumbnailFile.name);
      await Services.User.update(
        { thumbnail: imageUrl, displayName: settings.displayName },
        context.payload.username
      );

      return { thumbnail: imageUrl, displayName: settings.displayName };
    }
    await Services.User.update(
      { displayName: settings.displayName },
      context.payload.username
    );
    return { displayName: settings.displayName };
  }
}
