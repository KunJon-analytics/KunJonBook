"use client";

import { backendUrl } from "@/app/constants";
import { ApolloLink, HttpLink, SuspenseCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { setVerbosity } from "ts-invariant";
import { PostFeed } from "@/gql/graphql";

if (process.env.NODE_ENV === "development") {
  setVerbosity("debug");
  loadDevMessages();
  loadErrorMessages();
}

const cache = new NextSSRInMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        postsFeed: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing: PostFeed | undefined, incoming: PostFeed) {
            return {
              ...incoming,
              posts: [...(existing?.posts || []), ...incoming.posts],
            };
          },
        },
      },
    },
  },
});

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${backendUrl}/graphql`,
  });

  const errorLink = () => {
    return onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location:
        ${locations}, Path: ${path}`)
        );
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    });
  };

  return new NextSSRApolloClient({
    cache,
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            errorLink(),
            httpLink,
          ])
        : ApolloLink.from([errorLink(), httpLink]),
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export const ApolloWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
};
