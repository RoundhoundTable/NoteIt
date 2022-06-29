import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { ContextPayload } from "../../application/decorators/ContextPayload";
import { IContext } from "../../application/interfaces/IContext";
import { IPayload } from "../../application/interfaces/IPayload";
import { isAuth } from "../../application/middlewares/isAuth";
import { Services } from "../../application/services";
import { CreateNotebook } from "../../application/types/Notebook";
import { ERoles } from "../../domain/enumerators/ERoles";

@Resolver()
export class NotebookResolver {
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

    if (role !== ERoles.OWNER) console.error("error");
    return (await Services.Notebook.delete(notebook)) ? true : false;
  }
}
