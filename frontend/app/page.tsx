import React, { Suspense } from "react";
import styles from "./page.module.css";
import Feed from "./components/Feed";
import Chats from "./components/Chats";
import Loading from "./loading";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <Suspense fallback={<Loading />}>
          <Feed />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Chats />
        </Suspense>
      </div>
    </main>
  );
}
