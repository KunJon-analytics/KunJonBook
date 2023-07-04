import React, { Suspense } from "react";
import styles from "../../page.module.css";
import SearchBar from "./search";
import UserBar from "./user";
import Loading from "../Loading";
import { UserConsumer, user } from "../context/user";

const Bar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.inner}>
        <Suspense fallback={<Loading />}>
          <SearchBar />
        </Suspense>

        <UserConsumer>
          <UserBar user={user} />
        </UserConsumer>
      </div>
    </div>
  );
};

export default Bar;
