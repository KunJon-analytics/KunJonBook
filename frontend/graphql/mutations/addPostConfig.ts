import { backendUrl } from "@/app/constants";
import { AddPostMutation, AddPostMutationVariables } from "@/gql/graphql";
import {
  MutationUpdaterFunction,
  DefaultContext,
  ApolloCache,
  gql,
} from "@apollo/client";

export const optimisticResponse: (
  vars: AddPostMutationVariables
) => AddPostMutation = (vars) => {
  return {
    __typename: "Mutation",
    addPost: {
      __typename: "Post",
      text: vars.post.text,
      id: -1,
      user: {
        id: vars.userId,
        __typename: "User",
        username: "Loading...",
        avatar: `${backendUrl}/uploads/avatar1.png`,
      },
    },
  };
};

export const update: MutationUpdaterFunction<
  AddPostMutation,
  AddPostMutationVariables,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (data) {
    cache.modify({
      fields: {
        postsFeed(existingPostsFeed) {
          const { posts: existingPosts } = existingPostsFeed;
          const newPostRef = cache.writeFragment({
            data: data.addPost,
            fragment: gql`
              fragment NewPost on Post {
                id
                type
              }
            `,
          });
          return {
            ...existingPostsFeed,
            posts: [newPostRef, ...existingPosts],
          };
        },
      },
    });
  }
};
