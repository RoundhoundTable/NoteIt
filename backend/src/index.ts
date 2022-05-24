import dotenv from "dotenv";
import { HttpServer } from "./infrastructure/webserver/HttpServer";

dotenv.config();

const server: HttpServer = new HttpServer();

server.listen();
