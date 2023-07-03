"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import {
  Exact,
  InputMaybe,
  PostsFeedDocument,
  PostsFeedQuery,
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
    fetchMore: FetchMoreFunction<
      PostsFeedQuery,
      Exact<{
        limit?: InputMaybe<number> | undefined;
        offset?: InputMaybe<number> | undefined;
      }>
    >
  ) => {
    fetchMore({
      variables: {
        offset: data.postsFeed.posts.length,
      },
    });
  };

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <AddPostForm />
      <div className={styles.feed}>
        <Suspense fallback={<Loading />}>
          {data.postsFeed.posts.map((post, i) => (
            <div
              key={post.id}
              className={`${styles.post} ${
                post.id < 0 ? styles.optimistic : styles.nada
              }`}
            >
              <div className={styles.header}>
                <Image
                  src={post.user.avatar}
                  alt={post.user.username}
                  width={50}
                  height={50}
                />
                <h2>{post.user.username}</h2>
              </div>
              <p className={styles.content}>{post.text}</p>
            </div>
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
