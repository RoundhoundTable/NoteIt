import express, { Express } from "express";

export class HttpServer {
  private port: number | string;
  private app: Express;

  constructor() {
    this.port = process.env.HTTP_SERVER_PORT || 3000;
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.get("*", (_, res) => {
      res.send("NoteIt Incoming");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`NoteIt server listening on port ${this.port}...`);
    });
  }
}
