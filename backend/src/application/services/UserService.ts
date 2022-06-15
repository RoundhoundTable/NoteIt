import { DeepPartial, Repository } from "typeorm";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";

export class UserService {
  @InjectRepository(Entities.User)
  private readonly userRepository: Repository<Entities.User>;

  async create(payload: DeepPartial<Entities.User>, accountId: string) {
    try {
      const user: Entities.User = this.userRepository.create({
        ...payload,
        accountId,
      });

      return await this.userRepository.save(user);
    } catch (e) {
      console.log(e);
    }
  }

  async update(payload: DeepPartial<Entities.User>, username: string) {
    try {
      return await this.userRepository.update(username, payload);
    } catch (e) {
      console.log(e);
    }
  }
}
