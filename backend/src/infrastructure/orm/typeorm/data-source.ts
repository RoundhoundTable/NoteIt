import { DataSource } from "typeorm";
import dotenv from "dotenv";

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
  entities: [],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize().catch((err) => {
  console.error(err);
});
