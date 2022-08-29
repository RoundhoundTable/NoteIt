import { GraphQLError } from "graphql";
import { ApolloContext } from "../../graphql/context";
import { LoginMutationInput } from "../../types/LoginMutationInput";
import firebase from "../../../infrastructure/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const LoginMutationHandler = async (
  _parent: any,
  { credentials }: LoginMutationInput,
  ctx: ApolloContext
) => {
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
};
