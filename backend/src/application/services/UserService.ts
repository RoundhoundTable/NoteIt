import { DeepPartial, FindOptionsWhere, Like, Raw, Repository } from "typeorm";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";

export class UserService {
  @InjectRepository(Entities.User)
  private readonly userRepository: Repository<Entities.User>;

  async create(payload: DeepPartial<Entities.User>) {
    const user: Entities.User = this.userRepository.create({
      ...payload,
    });

    return await this.userRepository.save(user);
  }

  async update(payload: DeepPartial<Entities.User>, username: string) {
    return await this.userRepository.query(
      `UPDATE user SET thumbnail = COALESCE(?, thumbnail), display_name = COALESCE(?, display_name) WHERE username = ?`,
      [payload.thumbnail, payload.displayName, username]
    );
  }

  async getByAccount(accountId: string) {
    return await this.userRepository.findOne({
      where: {
        accountId,
      },
    });
  }

  async getByUsername(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async search(username: string, skip?: number, take?: number) {
    return await this.userRepository.find({
      where: {
        username: Like(`%${username}%`),
      },
      take,
      skip,
      order: {
        username: "DESC",
      },
    });
  }
}
