import { FirebaseError } from "@firebase/app";
import { PrismaClient, User } from "@prisma/client";
import { ApolloError } from "apollo-server";
import { getAuth } from "firebase-admin/auth";
import prisma from "../../infrastructure/orm/prisma/prisma";

export type ApolloContext = {
  prisma: PrismaClient;
  user: User | null;
};

export const createContext = async ({ req, res }): Promise<ApolloContext> => {
  const regex = /Bearer (.+)/i;
  let user: User | null = null;

  try {
    if (req.headers.authorization) {
      const { authorization, ...headers } = req.headers;
      const idToken = authorization.match(regex)?.[1];

      if (idToken) {
        const token = await getAuth().verifyIdToken(idToken);

        user = await prisma.user.findUnique({
          where: {
            accountId: token.uid,
          },
        });
      }
    }
  } catch (error) {
    if (error instanceof FirebaseError) throw new ApolloError(error.code);
  }

  return {
    prisma,
    user,
  };
};
