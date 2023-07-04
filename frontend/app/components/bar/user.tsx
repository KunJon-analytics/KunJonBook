"use client";

import React from "react";
import Image from "next/image";
import { UserList } from "./searchList";
import styles from "../../page.module.css";

const UserBar = ({
  user,
}: {
  user?: UserList["users"][number] | undefined;
}) => {
  if (!user) return null;

  return (
    <div className={styles.user}>
      <Image src={user.avatar} alt={user.username} height={50} width={50} />
      <span>{user.username}</span>
    </div>
  );
};

export default UserBar;
