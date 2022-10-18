import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";
import typeDefs from "../../application/graphql/schema";
import { DateTimeResolver } from "graphql-scalars";
import { ApolloServer } from "apollo-server";
import Field from "../../application/graphql/resolvers/field";
import Query from "../../application/graphql/resolvers/query";
import { createContext } from "../../application/graphql/context";
import Mutation from "../../application/graphql/resolvers/mutation";
import Enum from "../../application/graphql/resolvers/enum";
import Union from "../../application/graphql/resolvers/union";
import dotenv from "dotenv";

dotenv.config();

export class Server {
  private server: ApolloServer;

  constructor() {
    this.server = new ApolloServer({
      typeDefs,
      resolvers: {
        DateTime: DateTimeResolver,
        ...Field,
        ...Enum,
        ...Union,
        Query,
        Mutation,
      },
      csrfPrevention: true,
      cache: "bounded",
      context: createContext,
      formatError(error: GraphQLError) {
        if (error.originalError instanceof GraphQLError) return error;

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
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    });
  }

  bootstrap() {
    this.server
      .listen({
        port: process.env.PORT || 4000,
      })
      .then(({ url }) => {
        console.log(`NoteIt Server ready at ${url}`);
      });
  }
}
