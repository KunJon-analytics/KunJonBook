import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../components/helpers/Dropdown";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styles from "../page.module.css";
import { PostReturnType } from "./Index";
import { useDeletePostMutation } from "@/graphql/mutations/deletePostConfig";

const Header = ({ post }: { post: PostReturnType }) => {
  const [deletePost] = useDeletePostMutation(post.id);
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
          <Dropdown trigger={<FontAwesomeIcon icon={faAngleDown} />}>
            <button
              onClick={() => deletePost({ variables: { postId: post.id } })}
            >
              Delete
            </button>
          </Dropdown>
        </>
      )}{" "}
    </div>
  );
};

export default Header;
