import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { Entities } from "../../domain/entities";
import { ERoles } from "../../domain/enumerators/ERoles";
import { InjectRepository } from "../decorators/InjectRepository";

export class MembershipService {
  @InjectRepository(Entities.Membership)
  private readonly membershipRepository: Repository<Entities.Membership>;

  async getUserMembership(username: string): Promise<Entities.Membership[]> {
    try {
      return await this.membershipRepository.find({
        select: {
          notebookName: true,
        },
        where: {
          username: username,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(username?: string, notebook?: string) {
    try {
      let criteria = <FindOptionsWhere<Entities.Membership>>[
        { username },
        { notebook },
      ];

      return await this.membershipRepository.delete(criteria);
    } catch (e) {
      console.log(e);
    }
  }

  async create(
    payload: DeepPartial<Entities.Membership>
  ): Promise<Entities.Membership> {
    try {
      let membership: Entities.Membership =
        this.membershipRepository.create(payload);
      return await this.membershipRepository.save(membership);
    } catch (e) {
      console.log(e);
    }
  }

  async changeRole(username: string, notebook: string, role: ERoles) {
    try {
      let criteria = <FindOptionsWhere<Entities.Membership>>{
        username,
        notebook,
      };

      return await this.membershipRepository.update(criteria, { role });
    } catch (e) {
      console.log(e);
    }
  }
}
