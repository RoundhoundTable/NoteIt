import dotenv from "dotenv";
import "reflect-metadata";
import { HttpServer } from "./infrastructure/webserver/HttpServer";

dotenv.config();

const server: HttpServer = new HttpServer();

server.bootstrap();
