import { GraphQLError } from "graphql";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { IContext } from "../../application/interfaces/IContext";
import { isAuth } from "../../application/middlewares/isAuth";
import { Services } from "../../application/services";
import { ChangeRole } from "../../application/types/Membership";
import { Entities } from "../../domain/entities";
import { ERoles } from "../../domain/enumerators/ERoles";

@Resolver(() => Entities.Membership)
export class MembershipResolver {
  @FieldResolver(() => Number)
  async memberCount(@Root() notebook: Entities.Notebook): Promise<number> {
    return await Services.Membership.count(notebook.name);
  }

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

  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuth)
  async changeRole(
    @Arg("membershipPayload") membershipPayload: ChangeRole,
    @Ctx() context: IContext
  ) {
    const role: ERoles = await Services.Membership.getUserRole(
      context.payload.username,
      membershipPayload.notebookName
    );

    if (role !== ERoles.OWNER)
      throw new GraphQLError("Only the owner can change an user role");

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
