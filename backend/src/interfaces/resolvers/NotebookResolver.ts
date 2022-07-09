import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { ClientError } from "../../application/ClientError";
import { IContext } from "../../application/interfaces/IContext";
import { isAuth } from "../../application/middlewares/isAuth";
import { Services } from "../../application/services";
import { CreateNotebook } from "../../application/types/Notebook";
import { Entities } from "../../domain/entities";
import { ERoles } from "../../domain/enumerators/ERoles";

@Resolver(() => Entities.Notebook)
export class NotebookResolver {
  @FieldResolver(() => Boolean)
  @UseMiddleware(isAuth)
  async joinedByUser(
    @Root() notebook: Entities.Notebook,
    @Ctx() context: IContext
  ): Promise<boolean> {
    return (await Services.Membership.getUserRole(
      context.payload.username,
      notebook.name
    ))
      ? true
      : false;
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async createNotebook(
    @Arg("notebookPayload") notebookPayload: CreateNotebook,
    @Ctx() context: IContext
  ) {
    const notebook = await Services.Notebook.create(notebookPayload);
    const membership = await Services.Membership.create({
      notebookName: notebook.name,
      role: ERoles.OWNER,
      username: context.payload.username,
    });

    return notebook.name;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteNotebook(
    @Arg("notebook") notebook: string,
    @Ctx() context: IContext
  ) {
    const role: ERoles = await Services.Membership.getUserRole(
      context.payload.username,
      notebook
    );

    if (role !== ERoles.OWNER)
      throw new ClientError("Only the owner can delete a notebook");
    return (await Services.Notebook.delete(notebook)) ? true : false;
  }
}
