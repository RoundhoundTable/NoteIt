import { Arg, Mutation, Resolver } from "type-graphql";
import { Services } from "../../application/services";
import { CreateVote, DeleteVote } from "../../application/types/Vote";

@Resolver()
export class VoteResolver {
  @Mutation(() => Number)
  async vote(@Arg("votePayload") votePayload: CreateVote): Promise<number> {
    await Services.Vote.create(votePayload);

    return await Services.Vote.count(votePayload.noteId);
  }

  @Mutation(() => Number)
  async unvote(@Arg("votePayload") votePayload: DeleteVote): Promise<number> {
    await Services.Vote.delete(votePayload);

    return await Services.Vote.count(votePayload.noteId);
  }
}
