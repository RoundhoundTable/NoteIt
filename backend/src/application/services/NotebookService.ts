import { DeepPartial, Repository } from "typeorm";
import { Entities } from "../../domain/entities";
import { InjectRepository } from "../decorators/InjectRepository";

export class NotebookService {
  @InjectRepository(Entities.Notebook)
  private readonly notebookRepository: Repository<Entities.Notebook>;

  async create(
    payload: DeepPartial<Entities.Notebook>
  ): Promise<Entities.Notebook> {
    try {
      if (!this.notebookRepository.findOne({ where: { name: payload.name } }))
        throw new Error("NOTEBOOK ALREADY EXISTS");

      let notebook: Entities.Notebook = this.notebookRepository.create(payload);
      return await this.notebookRepository.save(notebook);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(notebook: string) {
    try {
      return await this.notebookRepository.delete({
        name: notebook,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async update(payload: DeepPartial<Entities.Notebook>, notebook: string) {
    try {
      return await this.notebookRepository.update(notebook, payload);
    } catch (e) {
      console.log(e);
    }
  }
}
