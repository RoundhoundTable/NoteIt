import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import cors, { CorsOptions } from "cors";
import { VoteResolver } from "../../interfaces/resolvers/VoteResolver";
import { AuthResolver } from "../../interfaces/resolvers/AuthResolver";
import { AppDataSource } from "../orm/typeorm/data-source";
import { NoteResolver } from "../../interfaces/resolvers/NoteResolver";
import { MembershipResolver } from "../../interfaces/resolvers/MembershipResolver";
import { NotebookResolver } from "../../interfaces/resolvers/NotebookResolver";
import { CommentResolver } from "../../interfaces/resolvers/CommentResolver";
import { UserResolver } from "../../interfaces/resolvers/UserResolver";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";
import { ClientError } from "../../application/ClientError";
import { GeneralResolver } from "../../interfaces/resolvers/GeneralResolver";

export class HttpServer {
  private port: number | string;
  private app: express.Express;

  constructor() {
    const corsOptions: CorsOptions = {
      credentials: true,
      origin: "*",
    };

    this.port = process.env.HTTP_SERVER_PORT || 3000;
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors(corsOptions));
  }

  async bootstrap() {
    try {
      const graphql = graphqlHTTP(async (req, res) => ({
        schema: await buildSchema({
          resolvers: [
            AuthResolver,
            VoteResolver,
            NoteResolver,
            MembershipResolver,
            NotebookResolver,
            CommentResolver,
            UserResolver,
            GeneralResolver,
          ],
        }),
        context: {
          req,
          res,
        },
        graphiql: true,
        customFormatErrorFn(error: GraphQLError) {
          if (error.originalError instanceof ClientError) return error;

          const errorId = v4();
          console.error({
            error: {
              id: errorId,
              name: error.name,
              message: error.message,
              path: error.path,
              stack: error.stack,
            },
          });

          return new GraphQLError(`Internal Error: ${errorId}`);
        },
      }));

      await AppDataSource.initialize();
      this.app.use("/graphql", graphql);

      this.app.listen(this.port, () => {
        console.log(`NoteIt server listening on port ${this.port}...`);
      });
    } catch (e) {
      console.log(e);
    }
  }
}
