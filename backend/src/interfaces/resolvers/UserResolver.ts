import { Mutation, Resolver } from "type-graphql";
import { Services } from "../../application/services";
import { UserSettings } from "../../application/types/User";
import { Entities } from "../../domain/entities";

@Resolver()
export class UserResolver {
  @Mutation(() => Entities.User)
  async updateSettings(payload: UserSettings) {
    return await Services.User.update(
      { ...payload.settings },
      payload.username
    );
  }
}
