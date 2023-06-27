"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { backendUrl } from "./constants";

interface Post {
  id: number;
  text: string;
  user: {
    avatar: string;
    username: string;
  };
}

const initialPosts: Post[] = [
  {
    id: 2,
    text: "Lorem ipsum",
    user: {
      avatar: `${backendUrl}/uploads/avatar1.png`,
      username: "Test User",
    },
  },
  {
    id: 1,
    text: "Lorem ipsum",
    user: {
      avatar: `${backendUrl}/uploads/avatar2.png`,
      username: "Test User 2",
    },
  },
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [postContent, setPostContent] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newPost: Post = {
      id: posts.length + 1,
      text: postContent,
      user: {
        avatar: "/uploads/avatar1.png",
        username: "Fake User",
      },
    };
    setPosts([newPost, ...posts]);
    setPostContent("");
  };

  return (
    <main className={styles.container}>
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
      <div className={styles.feed}>
        {posts.map((post, i) => (
          <div key={post.id} className={styles.post}>
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
      </div>
    </main>
  );
}
