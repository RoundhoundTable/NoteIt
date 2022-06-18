import { DeepPartial, In, Repository } from "typeorm";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";
import bcrypt from "bcrypt";

export class AccountService {
  @InjectRepository(Entities.Account)
  private readonly accountRepository: Repository<Entities.Account>;

  async create(
    payload: DeepPartial<Entities.Account>
  ): Promise<Entities.Account> {
    try {
      if (!this.accountRepository.findOne({ where: { email: payload.email } }))
        throw new Error("AN ACCOUNT ALREADY EXISTS");

      let account: Entities.Account = this.accountRepository.create({
        ...payload,
      });

      account.password = await bcrypt.hash(account.password, 10);

      return await this.accountRepository.save(account);
    } catch (e) {
      console.log(e);
    }
  }

  async get(email: string): Promise<Entities.Account> {
    try {
      return await this.accountRepository.findOne({
        where: {
          email,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
