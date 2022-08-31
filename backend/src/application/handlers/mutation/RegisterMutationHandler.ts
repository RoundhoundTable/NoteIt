import { ApolloContext } from "../../graphql/context";
import { RegisterMutationInput } from "../../types/RegisterMutationInput";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase from "../../../infrastructure/firebase/firebase";
import { registerSchema } from "../../validation/Auth";
import { GraphQLError } from "graphql";
import { formatError } from "../../validation/formatError";

export const RegisterMutationHandler = async (
  _parent: any,
  { credentials }: RegisterMutationInput,
  ctx: ApolloContext
) => {
  try {
    await registerSchema.validateAsync(credentials, { abortEarly: false });

    const auth = getAuth();
    const firebaseCredentials = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    const username = credentials.username.trim().toLocaleLowerCase();
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);

    const token = await firebase.auth.createCustomToken(
      firebaseCredentials.user.uid
    );

    await ctx.prisma.user.create({
      data: {
        username: credentials.username,
        displayName: displayName,
        accountId: firebaseCredentials.user.uid,
      },
    });

    return token;
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
