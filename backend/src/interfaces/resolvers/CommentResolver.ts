import { GraphQLError } from "graphql";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { IContext } from "../../application/interfaces/IContext";
import { isAuth } from "../../application/middlewares/isAuth";
import { Services } from "../../application/services";
import { CreateComment } from "../../application/types/Comment";
import { Entities } from "../../domain/entities";

@Resolver(() => Entities.Comment)
export class CommentResolver {
  @Query(() => [Entities.Comment], { nullable: true })
  async getNoteComments(
    @Arg("id") id: string,
    @Arg("offset", { nullable: true }) offset: number = 0
  ) {
    const comments: Entities.Comment[] = await Services.Comment.getFromNote(
      id,
      offset
    );

    return comments;
  }

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

  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg("commentId") commentId: string,
    @Ctx() context: IContext
  ) {
    const comment = await Services.Comment.get(commentId);

    if (comment.username !== context.payload.username)
      throw new GraphQLError("Only the owner can delete a comment");
    return (await Services.Comment.delete(commentId)) ? true : false;
  }
}
