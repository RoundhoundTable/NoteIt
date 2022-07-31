import { DeepPartial, Like, Repository } from "typeorm";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";

export class NotebookService {
  @InjectRepository(Entities.Notebook)
  private readonly notebookRepository: Repository<Entities.Notebook>;

  async create(
    payload: DeepPartial<Entities.Notebook>
  ): Promise<Entities.Notebook> {
    let notebook: Entities.Notebook = this.notebookRepository.create(payload);
    return await this.notebookRepository.save(notebook);
  }

  async delete(notebook: string) {
    return await this.notebookRepository.delete({
      name: notebook,
    });
  }

  async update(payload: DeepPartial<Entities.Notebook>, notebook: string) {
    return await this.notebookRepository.update(notebook, payload);
  }

  async get(notebook: string) {
    return await this.notebookRepository.findOne({
      where: {
        name: notebook,
      },
    });
  }

  async search(notebook: string, skip?: number, take?: number) {
    return await this.notebookRepository.find({
      where: {
        name: Like(`${notebook}%`),
      },
      take,
      skip,
      order: {
        name: "DESC",
      },
    });
  }
}
