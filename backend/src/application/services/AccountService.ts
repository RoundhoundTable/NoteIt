import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  In,
  Repository,
} from "typeorm";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";
import bcrypt from "bcrypt";
import { ClientError } from "../ClientError";

export class AccountService {
  @InjectRepository(Entities.Account)
  private readonly accountRepository: Repository<Entities.Account>;

  async create(
    payload: DeepPartial<Entities.Account>
  ): Promise<Entities.Account> {
    if (
      await this.accountRepository.findOne({
        where: {
          email: payload.email,
        },
      })
    )
      throw new ClientError("Email already in use");

    let account: Entities.Account = this.accountRepository.create({
      ...payload,
    });

    account.password = await bcrypt.hash(account.password, 10);

    return await this.accountRepository.save(account);
  }

  async get(email: string): Promise<Entities.Account> {
    return await this.accountRepository.findOne({
      where: {
        email,
      },
    });
  }

  async delete(accountId: string): Promise<DeleteResult> {
    return await this.accountRepository.delete(<
      FindOptionsWhere<Entities.Account>
    >{
      id: accountId,
    });
  }
}
