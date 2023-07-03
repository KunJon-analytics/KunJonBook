import React from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { PostReturnType } from "./Index";

const Header = ({ post }: { post: PostReturnType }) => {
  return (
    <div className={styles.header}>
      {post.user && (
        <>
          <Image
            src={post.user.avatar}
            alt={post.user.username}
            width={50}
            height={50}
          />
          <div>
            <h2>{post.user.username}</h2>
          </div>
        </>
      )}{" "}
    </div>
  );
};

export default Header;
