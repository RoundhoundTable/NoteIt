import { EntityTarget } from "typeorm";
import { AppDataSource } from "../../infrastructure/orm/typeorm/data-source";

export const InjectRepository = (entity: EntityTarget<unknown>) => {
  return function (target: any, propertyKey: any) {
    Object.defineProperty(target, propertyKey, {
      value: AppDataSource.getRepository(entity),
      writable: false,
    });
  };
};
