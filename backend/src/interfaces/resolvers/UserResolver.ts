import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { IContext } from "../../application/interfaces/IContext";
import { IPayload } from "../../application/interfaces/IPayload";
import { isAuth } from "../../application/middlewares/isAuth";
import { Services } from "../../application/services";
import { Settings } from "../../application/types/User";
import { Entities } from "../../domain/entities";

@Resolver()
export class UserResolver {
  @Mutation(() => Entities.User)
  @UseMiddleware(isAuth)
  async updateSettings(
    @Arg("settings") settings: Settings,
    @Ctx() context: IContext
  ) {
    return await Services.User.update(
      { ...settings },
      context.payload.username
    );
  }
}
