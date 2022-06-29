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

  async checkUserLike(username: string, noteId: string): Promise<boolean> {
    const vote: Entities.Vote = await this.voteRepository.findOne({
      where: {
        username,
        noteId,
      },
    });

    return vote ? true : false;
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

  async count(noteId: string): Promise<number> {
    return await this.voteRepository.count({
      where: {
        noteId,
      },
    });
  }
}
