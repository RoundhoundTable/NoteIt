import { Arg, Mutation, Resolver } from "type-graphql";
import { Services } from "../../application/services";
import { Access, LoginForm, RegisterForm } from "../../application/types/Auth";
import { Entities } from "../../domain/entities";

@Resolver()
export class AuthResolver {
  @Mutation(() => Entities.User)
  async register(
    @Arg("form", { nullable: false }) form: RegisterForm
  ): Promise<Entities.User> {
    const account: Entities.Account = await Services.Account.create({
      email: form.email,
      password: form.password,
    });
    const user: Entities.User = await Services.User.create({
      accountId: account.id,
      username: form.username,
      displayName:
        form.username.charAt(0).toUpperCase() + form.username.slice(1),
    });

    return user;
  }

  @Mutation(() => Access)
  async login(
    @Arg("credentials", { nullable: false }) credentials: LoginForm
  ): Promise<Access> {
    return {
      accessToken: credentials.email,
    };
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Arg("accountId") accountId: string) {
    return (await Services.Account.delete(accountId)) ? true : false;
  }
}
