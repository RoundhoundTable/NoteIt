import { EntityTarget } from "typeorm";
import { AppDataSource } from "../../infrastructure/orm/typeorm/data-source";
import dotenv from "dotenv";

dotenv.config();

export const InjectRepository = (entity: EntityTarget<unknown>) => {
  return function (target: any, propertyKey: any) {
    Object.defineProperty(target, propertyKey, {
      value: AppDataSource.getRepository(entity),
      writable: false,
    });
  };
};
