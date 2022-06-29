import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Services } from "../../application/services";
import { Access, LoginForm, RegisterForm } from "../../application/types/Auth";
import { Entities } from "../../domain/entities";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { isAuth } from "../../application/middlewares/isAuth";
import { IPayload } from "../../application/interfaces/IPayload";
import { IContext } from "../../application/interfaces/IContext";

dotenv.config();

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
    const account: Entities.Account = await Services.Account.get(
      credentials.email
    );

    if (!account) throw new Error("INVALID_CREDENTIALS");

    const valid = await bcrypt.compare(credentials.password, account.password);

    if (!valid) throw new Error("INVALID_CREDENTIALS");

    const username: string = (await Services.User.getByAccount(account.id))
      .username;

    const accessToken: string = sign(
      {
        username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15d",
      }
    );

    return {
      accessToken,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteAccount(@Ctx() context: IContext) {
    return (await Services.Account.delete(context.payload.accountId))
      ? true
      : false;
  }
}
