"use client";

import {
  AddPostDocument,
  AddPostMutation,
  PostsDocument,
  PostsQuery,
} from "@/gql/graphql";
import styles from "../page.module.css";
import { ApolloCache, gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { backendUrl } from "../constants";

const updateCache = (
  cache: ApolloCache<any>,
  { data }: { data?: AddPostMutation | null | undefined }
) => {
  const oldPosts = cache.readQuery({ query: PostsDocument });
  if (oldPosts && data) {
    const newPosts: PostsQuery = {
      ...oldPosts,
      posts: [data.addPost, ...oldPosts.posts],
    };
    cache.writeQuery({ query: PostsDocument, data: newPosts });
  }
};

const AddPostForm = () => {
  const [postContent, setPostContent] = useState("");
  const resetInput = () => {
    setPostContent("");
  };
  const [addPost] = useMutation(AddPostDocument, {
    optimisticResponse: {
      __typename: "Mutation",
      addPost: {
        __typename: "Post",
        text: postContent,
        id: -1,
        user: {
          id: -1,
          __typename: "User",
          username: "Loading...",
          avatar: `${backendUrl}/uploads/avatar1.png`,
        },
      },
    },
    update(cache, { data }) {
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
    },
    onCompleted: resetInput,
  });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (postContent.length < 10) {
      return;
    }
    addPost({ variables: { post: { text: postContent }, userId: 2 } });
  };

  return (
    <div className={styles.postForm}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Write your custom post!"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddPostForm;
