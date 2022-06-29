import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { IContext } from "../../application/interfaces/IContext";
import { isAuth } from "../../application/middlewares/isAuth";
import { Services } from "../../application/services";
import { CreateComment } from "../../application/types/Comment";
import { Entities } from "../../domain/entities";

@Resolver()
export class CommentResolver {
  @Mutation(() => Entities.Comment)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("comment") comment: CreateComment,
    @Ctx() context: IContext
  ) {
    return await Services.Comment.create({
      ...comment,
      username: context.payload.username,
    });
  }

  //TODO: Get username from context
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg("commentId") commentId: string,
    @Ctx() context: IContext
  ) {
    const comment = await Services.Comment.get(commentId);

    if (comment.username !== context.payload.username) console.error("a");
    return (await Services.Comment.delete(commentId)) ? true : false;
  }
}
