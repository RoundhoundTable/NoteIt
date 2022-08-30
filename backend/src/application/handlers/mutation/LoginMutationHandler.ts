import { GraphQLError } from "graphql";
import { ApolloContext } from "../../graphql/context";
import { LoginMutationInput } from "../../types/LoginMutationInput";
import firebase from "../../../infrastructure/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loginSchema } from "../../validation/Auth";
import { FirebaseError } from "firebase/app";
import Joi from "joi";

export const LoginMutationHandler = async (
  _parent: any,
  { credentials }: LoginMutationInput,
  ctx: ApolloContext
) => {
  try {
    await loginSchema.validateAsync(credentials);

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
    if (error instanceof FirebaseError) {
      throw new GraphQLError(error.code);
    }
    if (error instanceof Joi.ValidationError) {
      console.log(error);
      throw new GraphQLError(
        error.details.map((err) => err.message).join("\n")
      );
    }
  }
};
