import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Services } from "../../application/services";
import { Access, LoginForm, RegisterForm } from "../../application/types/Auth";
import { Entities } from "../../domain/entities";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { isAuth } from "../../application/middlewares/isAuth";
import { IContext } from "../../application/interfaces/IContext";
import { GraphQLError } from "graphql";

dotenv.config();

@Resolver()
export class AuthResolver {
  @Mutation(() => Entities.User, { nullable: true })
  async register(
    @Arg("form", { nullable: false }) form: RegisterForm
  ): Promise<Entities.User> {
    if (await Services.User.getByUsername(form.username))
      throw new GraphQLError("Username already in use");

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

  @Mutation(() => Access, { nullable: true })
  async login(
    @Arg("credentials", { nullable: false }) credentials: LoginForm
  ): Promise<Access> {
    const account: Entities.Account = await Services.Account.getByEmail(
      credentials.email
    );

    if (!account) throw new GraphQLError("Account doesn't exist");

    const valid = await bcrypt.compare(credentials.password, account.password);

    if (!valid) throw new GraphQLError("Invalid Credentials");

    const { username } = await Services.User.getByAccount(account.id);

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
