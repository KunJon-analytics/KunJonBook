import React from "react";
import styles from "./page.module.css";
import Feed from "./components/Feed";
import Chats from "./components/Chats";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <Feed />
        <Chats />
      </div>
    </main>
  );
}
