"use client";

import React, { Suspense } from "react";
import Post from "../(post)/Index";
import styles from "../page.module.css";
import Error from "./Error";
import {
  PostsFeedDocument,
  PostsFeedQuery,
  PostsFeedQueryVariables,
} from "@/gql/graphql";
import AddPostForm from "./AddPostForm";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { FetchMoreFunction } from "@apollo/client";
import { InView } from "react-intersection-observer";
import Loading from "../loading";

export default function Feed() {
  const { data, error, fetchMore } = useSuspenseQuery(PostsFeedDocument, {
    variables: { limit: 10, offset: 0 },
  });

  const loadMore = async (
    fetchMore: FetchMoreFunction<PostsFeedQuery, PostsFeedQueryVariables>
  ) => {
    fetchMore({
      variables: {
        offset: data.postsFeed.posts.length,
      },
    });
  };

  if (error)
    return (
      <Error>
        <p>{error.message}</p>
      </Error>
    );

  return (
    <>
      <AddPostForm />
      <div className={styles.feed}>
        <Suspense fallback={<Loading />}>
          {data.postsFeed.posts.map((post, i) => (
            <Post post={post} key={post.id} />
          ))}
        </Suspense>

        <InView
          onChange={async (inView) => {
            if (inView && data.postsFeed.hasMore) {
              await loadMore(fetchMore);
            }
          }}
        />
      </div>
    </>
  );
}
