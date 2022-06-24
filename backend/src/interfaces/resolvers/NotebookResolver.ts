import { Arg, Mutation, Resolver } from "type-graphql";
import { Services } from "../../application/services";
import { CreateNotebook } from "../../application/types/Notebook";
import { ERoles } from "../../domain/enumerators/ERoles";

@Resolver()
export class NotebookResolver {
  @Mutation(() => String)
  async createNotebook(
    @Arg("notebookPayload") payload: CreateNotebook,
    @Arg("username") username: string
  ) {
    const notebook = await Services.Notebook.create(payload);
    const membership = await Services.Membership.create({
      notebookName: notebook.name,
      role: ERoles.OWNER,
      username,
    });

    return notebook.name;
  }

  @Mutation(() => Boolean)
  async deleteNotebook(@Arg("notebook") notebook: string) {
    return (await Services.Notebook.delete(notebook)) ? true : false;
  }
}
