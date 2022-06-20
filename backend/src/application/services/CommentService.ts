import { DeepPartial, Repository } from "typeorm";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";

export class CommentService {
  @InjectRepository(Entities.Comment)
  private readonly commentRepository: Repository<Entities.Comment>;

  async create(
    payload: DeepPartial<Entities.Comment>
  ): Promise<Entities.Comment> {
    let comment: Entities.Comment = this.commentRepository.create(payload);
    return await this.commentRepository.save(comment);
  }

  async delete(id: string) {
    return await this.commentRepository.delete(id);
  }
}
