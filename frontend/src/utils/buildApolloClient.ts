import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { getAuth } from "firebase/auth";

export const buildApolloClient = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000",
  });

  const getIdToken = async () => await getAuth().currentUser?.getIdToken();

  const authLink = setContext(async (_, { headers }) => {
    const token = await getIdToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        "Bypass-Tunnel-Reminder": true,
      },
    };
  });

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            keyArgs: false,
            merge(existing, incoming) {
              return {
                ...incoming,
                notes: [...(existing?.notes ?? []), ...(incoming?.notes ?? [])],
              };
            },
          },
          notes: {
            keyArgs: false,
            merge(existing, incoming) {
              return {
                ...incoming,
                notes: [...(existing?.notes ?? []), ...(incoming?.notes ?? [])],
              };
            },
          },
          comments: {
            keyArgs: false,
            merge(existing, incoming) {
              return {
                ...incoming,
                comments: [
                  ...(existing?.comments ?? []),
                  ...(incoming?.comments ?? []),
                ],
              };
            },
          },
          search: offsetLimitPagination(),
        },
      },
    },
  });

  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache,
  });
};
