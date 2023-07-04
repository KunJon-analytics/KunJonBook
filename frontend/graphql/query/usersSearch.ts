import { UsersSearchDocument } from "@/gql/graphql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export const getUserSearchConfig = (text: string) => ({
  variables: { page: 0, limit: 5, text },
  skip: text.length < 3,
});

export const useUserSearchQuery = (text: string) =>
  useSuspenseQuery(UsersSearchDocument, getUserSearchConfig(text));
