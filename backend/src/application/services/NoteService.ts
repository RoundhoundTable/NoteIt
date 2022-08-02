import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  In,
  Repository,
} from "typeorm";
import { Services } from ".";
import { Entities } from "../../domain/entities";
import { EFromOptions } from "../enumerators/EFromOptions";
import { InjectRepository } from "../decorators/InjectRepository";

export class NoteService {
  @InjectRepository(Entities.Note)
  private readonly noteRepository: Repository<Entities.Note>;

  async get(
    type: EFromOptions,
    source: string,
    skip: number = 0
  ): Promise<Entities.Note[]> {
    let where: FindOptionsWhere<Entities.Note>;

    switch (type) {
      case EFromOptions.PROFILE: {
        where = {
          username: source,
        };
        break;
      }
      case EFromOptions.NOTEBOOK: {
        where = {
          notebookName: source,
        };
        break;
      }
    }

    const notes = await this.noteRepository.find({
      where,
      relations: {
        notebook: true,
        user: true,
      },
      order: {
        createdOn: "DESC",
      },
      take: 5,
      skip,
    });

    return notes;
  }

  async getFeed(username: string, skip: number = 0) {
    const joinedNotebooks: string[] = (
      await Services.Membership.getUserMembership(username)
    ).map((membership) => membership.notebookName);

    const notes = await this.noteRepository.find({
      where: {
        notebookName: In(joinedNotebooks),
      },
      relations: {
        notebook: true,
        user: true,
      },
      order: {
        createdOn: "DESC",
      },
      take: 5,
      skip,
    });

    return notes;
  }

  async getOne(id: string) {
    return await this.noteRepository.findOne({
      relations: {
        notebook: true,
        user: true,
      },
      where: {
        id,
      },
    });
  }

  async update(payload: DeepPartial<Entities.Note>) {
    const { id, ...data } = payload;
    return await this.noteRepository.update(id, data);
  }

  async create(payload: DeepPartial<Entities.Note>): Promise<Entities.Note> {
    let note: Entities.Note = this.noteRepository.create({
      ...payload,
    });

    return await this.noteRepository.save(note);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.noteRepository.delete(id);
  }
}
