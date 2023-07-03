"use client";

import { AddPostDocument } from "@/gql/graphql";
import styles from "../page.module.css";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { optimisticResponse, update } from "@/graphql/mutations/addPostConfig";

const AddPostForm = () => {
  const [postContent, setPostContent] = useState("");
  const resetInput = () => {
    setPostContent("");
  };
  const [addPost] = useMutation(AddPostDocument, {
    optimisticResponse: optimisticResponse({
      post: { text: postContent },
      userId: -1,
    }),
    update,
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
