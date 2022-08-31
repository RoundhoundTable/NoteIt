import { useApolloClient } from "@apollo/client";
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCustomToken,
  UserCredential,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { _user, _userData } from "../graphql/queries/_user";
import { User } from "../interfaces/Entities";

if (!getApps().length)
  initializeApp({
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`,
  });

export interface AuthContext {
  currentUser: User | null;
  signIn: (token: string) => Promise<UserCredential>;
  signOut: () => any;
  signUp: (token: string) => Promise<UserCredential>;
  fetch: () => Promise<void>;
}

const auth = getAuth();
const AuthContext = createContext<AuthContext | null>(null);

export const useAuth = () => {
  return useContext(AuthContext) as AuthContext;
};

export const AuthProvider = ({ children }: PropsWithChildren<any>) => {
  const client = useApolloClient();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = (token: string) => {
    return signInWithCustomToken(auth, token);
  };

  const signOut = (): any => {
    return firebaseSignOut(auth);
  };

  const signUp = (token: string) => {
    return signInWithCustomToken(auth, token);
  };

  const fetch = async () => {
    const { data } = await client.query<_userData>({
      query: _user,
    });

    if (data) setCurrentUser(data._user);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      await fetch();
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signIn,
    signOut,
    signUp,
    fetch,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
