import { DeepPartial, DeleteResult, In, Repository } from "typeorm";
import { Services } from ".";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";

export class NoteService {
  @InjectRepository(Entities.Note)
  private readonly noteRepository: Repository<Entities.Note>;

  async getFromUser(
    target: string,
    skip: number = 0
  ): Promise<Entities.Note[]> {
    try {
      return await this.noteRepository.find({
        where: {
          username: target,
        },
        relations: {
          notebook: true,
        },
        order: {
          createdOn: "DESC",
        },
        take: 5,
        skip,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getFromNotebook(
    notebookName: string,
    skip: number = 0
  ): Promise<Entities.Note[]> {
    try {
      return await this.noteRepository.find({
        where: {
          notebookName,
        },
        relations: {
          user: true,
        },
        order: {
          createdOn: "DESC",
        },
        take: 5,
        skip,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getFeed(username: string, skip: number = 0): Promise<Entities.Note[]> {
    try {
      const joinedNotebooks: string[] = (
        await Services.Membership.getUserMembership(username)
      ).map((membership) => membership.notebookName);

      return await this.noteRepository.find({
        select: {
          notebook: {
            name: true,
          },
          user: {
            username: true,
            displayName: true,
            thumbnail: true,
          },
        },
        relations: {
          notebook: true,
          user: true,
        },
        where: {
          notebookName: In(joinedNotebooks),
        },
        take: 5,
        skip,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async get(id: string) {
    try {
      return await this.noteRepository.findOne({
        select: {
          comments: {
            createdOn: true,
            content: true,
            id: true,
            user: {
              username: true,
              displayName: true,
              thumbnail: true,
            },
          },
          notebook: {
            name: true,
            thumbnail: true,
          },
          user: {
            username: true,
            displayName: true,
            thumbnail: true,
          },
        },
        relations: {
          comments: true,
          notebook: true,
          user: true,
        },
        where: {
          id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async update(payload: DeepPartial<Entities.Note>) {
    const { id, ...data } = payload;
    return await this.noteRepository.update(id, data);
  }

  async create(payload: DeepPartial<Entities.Note>): Promise<Entities.Note> {
    try {
      let note: Entities.Note = this.noteRepository.create({
        ...payload,
      });

      return await this.noteRepository.save(note);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      return await this.noteRepository.delete(id);
    } catch (e) {
      console.log(e);
    }
  }
}
