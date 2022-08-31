import dotenv from "dotenv";
import { Server } from "./infrastructure/webserver/Server";

dotenv.config();

const server: Server = new Server();

server.bootstrap();
