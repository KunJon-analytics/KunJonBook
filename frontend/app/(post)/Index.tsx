import React from "react";
import PostHeader from "./Header";
import PostContent from "./Content";
import styles from "../page.module.css";
import { PostsFeedQuery } from "@/gql/graphql";

export type PostReturnType = PostsFeedQuery["postsFeed"]["posts"][0];

const Index = ({ post }: { post: PostReturnType }) => {
  return (
    <div
      className={`${styles.post} ${
        (post.id || -1) < 0 ? styles.optimistic : styles.nada
      }`}
    >
      <PostHeader post={post} />
      <PostContent post={post} />
    </div>
  );
};

export default Index;
