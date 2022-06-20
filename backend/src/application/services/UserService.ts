import { DeepPartial, Repository } from "typeorm";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";

export class UserService {
  @InjectRepository(Entities.User)
  private readonly userRepository: Repository<Entities.User>;

  async create(payload: DeepPartial<Entities.User>, accountId: string) {
    if (!this.userRepository.findOne({ where: { username: payload.username } }))
      throw new Error("USERNAME ALREADY IN USE");

    const user: Entities.User = this.userRepository.create({
      ...payload,
      accountId,
    });

    return await this.userRepository.save(user);
  }

  async update(payload: DeepPartial<Entities.User>, username: string) {
    return await this.userRepository.update(username, payload);
  }
}
