import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { Entities } from "../../domain/entities";
import { ERoles } from "../../domain/enumerators/ERoles";
import { InjectRepository } from "../decorators/InjectRepository";

export class MembershipService {
  @InjectRepository(Entities.Membership)
  private readonly membershipRepository: Repository<Entities.Membership>;

  async getUserMembership(username: string): Promise<Entities.Membership[]> {
    return await this.membershipRepository.find({
      select: {
        notebookName: true,
      },
      where: {
        username: username,
      },
    });
  }

  async delete(username?: string, notebook?: string) {
    let criteria = <FindOptionsWhere<Entities.Membership>>[
      { username },
      { notebook },
    ];

    return await this.membershipRepository.delete(criteria);
  }

  async create(
    payload: DeepPartial<Entities.Membership>
  ): Promise<Entities.Membership> {
    let membership: Entities.Membership =
      this.membershipRepository.create(payload);
    return await this.membershipRepository.save(membership);
  }

  async changeRole(username: string, notebook: string, role: ERoles) {
    let criteria = <FindOptionsWhere<Entities.Membership>>{
      username,
      notebook,
    };

    return await this.membershipRepository.update(criteria, { role });
  }

  async getUserRole(username: string, notebook: string): Promise<ERoles> {
    return (
      await this.membershipRepository.findOne({
        where: {
          username,
          notebookName: notebook,
        },
      })
    ).role;
  }

  async count(notebook: string): Promise<number> {
    return await this.membershipRepository.count({
      where: {
        notebookName: notebook,
      },
    });
  }
}
