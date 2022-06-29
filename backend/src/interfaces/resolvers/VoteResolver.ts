import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { ContextPayload } from "../../application/decorators/ContextPayload";
import { IContext } from "../../application/interfaces/IContext";
import { IPayload } from "../../application/interfaces/IPayload";
import { isAuth } from "../../application/middlewares/isAuth";
import { Services } from "../../application/services";
import { CreateVote } from "../../application/types/Vote";
import { Entities } from "../../domain/entities";

@Resolver()
export class VoteResolver {
  @Mutation(() => Number)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("votePayload") votePayload: CreateVote,
    @Ctx() context: IContext
  ): Promise<number> {
    await Services.Vote.create({
      ...votePayload,
      username: context.payload.username,
    });

    return await Services.Vote.count(votePayload.noteId);
  }

  @Mutation(() => Number)
  @UseMiddleware(isAuth)
  async unvote(
    @Arg("noteId") noteId: string,
    @Ctx() context: IContext
  ): Promise<number> {
    await Services.Vote.delete({ noteId, username: context.payload.username });

    return await Services.Vote.count(noteId);
  }
}
