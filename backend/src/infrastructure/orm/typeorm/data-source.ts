import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Entities } from "../../../domain/entities";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOSTNAME,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [
    Entities.Account,
    Entities.User,
    Entities.Notebook,
    Entities.Membership,
    Entities.Note,
    Entities.Vote,
    Entities.Comment,
  ],
  subscribers: [],
  migrations: [],
});
