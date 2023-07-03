import {
  DeletePostDocument,
  DeletePostMutation,
  DeletePostMutationVariables,
} from "@/gql/graphql";
import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  Reference,
  useMutation,
} from "@apollo/client";

export const getDeletePostConfig: (
  postId: number
) => MutationHookOptions<
  DeletePostMutation,
  DeletePostMutationVariables,
  DefaultContext,
  ApolloCache<any>
> = (postId: number) => ({
  update(cache, { data }) {
    if (data?.deletePost.success) {
      cache.modify({
        fields: {
          postsFeed(postsFeed, { readField }) {
            return {
              ...postsFeed,
              posts: postsFeed.posts.filter(
                (postRef: Reference) => postId !== readField("id", postRef)
              ),
            };
          },
        },
      });
    }
  },
});

export const useDeletePostMutation = (postId: number) =>
  useMutation(DeletePostDocument, getDeletePostConfig(postId));
