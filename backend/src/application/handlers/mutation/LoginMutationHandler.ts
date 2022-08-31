import { GraphQLError } from "graphql";
import { ApolloContext } from "../../graphql/context";
import { LoginMutationInput } from "../../types/LoginMutationInput";
import firebase from "../../../infrastructure/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loginSchema } from "../../validation/Auth";
import { formatError } from "../../validation/formatError";

export const LoginMutationHandler = async (
  _parent: any,
  { credentials }: LoginMutationInput,
  ctx: ApolloContext
) => {
  try {
    await loginSchema.validateAsync(credentials, { abortEarly: false });

    const auth = getAuth();
    const firebaseCredentials = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    const token = await firebase.auth.createCustomToken(
      firebaseCredentials.user.uid
    );

    return token;
  } catch (error) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};
