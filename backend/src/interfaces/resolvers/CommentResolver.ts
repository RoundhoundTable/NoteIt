import { Arg, Mutation, Resolver } from "type-graphql";
import { Services } from "../../application/services";
import { CreateComment } from "../../application/types/Comment";
import { Entities } from "../../domain/entities";

@Resolver()
export class CommentResolver {
  @Mutation(() => Entities.Comment)
  async createComment(@Arg("comment") comment: CreateComment) {
    return await Services.Comment.create(comment);
  }

  @Mutation(() => Boolean)
  async deleteComment(@Arg("commentId") commentId: string) {
    return (await Services.Comment.delete(commentId)) ? true : false;
  }
}
