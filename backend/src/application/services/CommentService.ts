import { DeepPartial, Repository } from "typeorm";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";

export class CommentService {
  @InjectRepository(Entities.Comment)
  private readonly commentRepository: Repository<Entities.Comment>;

  async create(
    payload: DeepPartial<Entities.Comment>
  ): Promise<Entities.Comment> {
    try {
      let comment: Entities.Comment = this.commentRepository.create(payload);
      return await this.commentRepository.save(comment);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: string) {
    try {
      return await this.commentRepository.delete(id);
    } catch (e) {
      console.log(e);
    }
  }
}
