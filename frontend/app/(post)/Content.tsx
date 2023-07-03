import React from "react";
import styles from "../page.module.css";
import { PostReturnType } from "./Index";

const Content = ({ post }: { post: PostReturnType }) => {
  return <p className={styles.content}>{post.text}</p>;
};

export default Content;
