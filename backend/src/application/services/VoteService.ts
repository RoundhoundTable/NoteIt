import { Repository } from "typeorm";
import { Services } from ".";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";

export class VoteService {
  @InjectRepository(Entities.Vote)
  private readonly voteRepository: Repository<Entities.Vote>;

  async checkUserLike(username: string, noteId: string): Promise<boolean> {
    let vote: Entities.Vote = await this.voteRepository.findOne({
      where: {
        username,
        noteId,
      },
    });

    return vote ? true : false;
  }

  async vote(
    noteId: string,
    username: string,
    value: number
  ): Promise<Entities.Vote> {
    let vote: Entities.Vote = this.voteRepository.create({
      noteId,
      username,
      value,
    });

    return await this.voteRepository.save(vote);
  }
}
