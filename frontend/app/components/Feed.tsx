"use client";

import React, { useState } from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchMoreFunction } from "@apollo/client";

export default function Feed() {
  const { data, error, fetchMore } = useSuspenseQuery(PostsFeedDocument, {
    variables: { limit: 10, page: 0 },
  });
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadMore = (
    fetchMore: FetchMoreFunction<
      PostsFeedQuery,
      Exact<{
        limit?: InputMaybe<number> | undefined;
        page?: InputMaybe<number> | undefined;
      }>
    >
  ) => {
    fetchMore({
      variables: {
        page: page + 1,
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        if (!fetchMoreResult.postsFeed.posts.length) {
          setHasMore(false);
          return previousResult;
        }

        setPage(page + 1);

        const newData = {
          postsFeed: {
            __typename: "PostFeed" as const,
            posts: [
              ...previousResult.postsFeed.posts,
              ...fetchMoreResult.postsFeed.posts,
            ],
          },
        };
        return newData;
      },
    });
  };

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <AddPostForm />
      <div className={styles.feed}>
        <InfiniteScroll
          dataLength={data.postsFeed.posts.length}
          next={() => loadMore(fetchMore)}
          hasMore={hasMore}
          loader={
            <div className={styles.loader} key={"loader"}>
              Loading ...
            </div>
          }
        >
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
        </InfiniteScroll>
      </div>
    </>
  );
}
