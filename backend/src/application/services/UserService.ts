import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
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
    return await this.userRepository.update(
      <FindOptionsWhere<Entities.User>>{
        where: {
          username,
        },
      },
      payload
    );
  }
}
