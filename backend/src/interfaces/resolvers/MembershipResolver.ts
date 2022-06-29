import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { ContextPayload } from "../../application/decorators/ContextPayload";
import { IContext } from "../../application/interfaces/IContext";
import { IPayload } from "../../application/interfaces/IPayload";
import { isAuth } from "../../application/middlewares/isAuth";
import { Services } from "../../application/services";
import { ChangeRole } from "../../application/types/Membership";
import { ERoles } from "../../domain/enumerators/ERoles";

@Resolver()
export class MembershipResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinNotebook(
    @Arg("notebook") notebook: string,
    @Ctx() context: IContext
  ) {
    return (await Services.Membership.create({
      notebookName: notebook,
      username: context.payload.username,
    }))
      ? true
      : false;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async changeRole(
    @Arg("membershipPayload") membershipPayload: ChangeRole,
    @Ctx() context: IContext
  ) {
    const role: ERoles = await Services.Membership.getUserRole(
      context.payload.username,
      membershipPayload.notebookName
    );

    if (role !== ERoles.OWNER) console.error("error");

    return (await Services.Membership.changeRole(
      membershipPayload.username,
      membershipPayload.notebookName,
      membershipPayload.role
    ))
      ? true
      : false;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async leaveNotebook(
    @Arg("notebook") notebook: string,
    @Ctx() context: IContext
  ) {
    return (await Services.Membership.delete(
      context.payload.username,
      notebook
    ))
      ? false
      : true;
  }
}
