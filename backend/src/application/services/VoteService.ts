import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";

export class VoteService {
  @InjectRepository(Entities.Vote)
  private readonly voteRepository: Repository<Entities.Vote>;

  async checkUserLike(username: string, noteId: string): Promise<number> {
    const vote: Entities.Vote = await this.voteRepository.findOne({
      where: {
        username,
        noteId,
      },
    });

    return vote ? vote.value : 0;
  }

  async create(payload: DeepPartial<Entities.Vote>): Promise<Entities.Vote> {
    const vote: Entities.Vote = this.voteRepository.create(payload);

    return await this.voteRepository.save(vote);
  }

  async delete(payload: DeepPartial<Entities.Vote>): Promise<DeleteResult> {
    return await this.voteRepository.delete(<FindOptionsWhere<Entities.Vote>>{
      ...payload,
    });
  }

  async getScore(noteId: string): Promise<number> {
    const { score } = await this.voteRepository
      .createQueryBuilder()
      .select("SUM(vote.value)", "score")
      .where("note_id = :noteId", { noteId })
      .getRawOne();

    return score;
  }
}
