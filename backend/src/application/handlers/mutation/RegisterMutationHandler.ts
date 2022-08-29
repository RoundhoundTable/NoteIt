import { ApolloContext } from "../../graphql/context";
import { RegisterMutationInput } from "../../types/RegisterMutationInput";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase from "../../../infrastructure/firebase/firebase";

export const RegisterMutationHandler = async (
  _parent,
  { credentials }: RegisterMutationInput,
  ctx: ApolloContext
) => {
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
};
