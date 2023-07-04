import React, { useState, useEffect } from "react";
import Image from "next/image";

import { UsersSearchQuery } from "@/gql/graphql";
import styles from "../../page.module.css";

export type UserList = NonNullable<UsersSearchQuery["usersSearch"]>;

const SearchList = ({ data: { usersSearch } }: { data: UsersSearchQuery }) => {
  const { users } = usersSearch as UserList;
  const [show, setShowList] = useState(false);

  const handleShow = (show: boolean) => {
    if (show) {
      document.addEventListener("click", handleShow.bind(null, !show), true);
    } else {
      document.removeEventListener("click", handleShow.bind(null, !show), true);
    }
    setShowList(show);
  };

  const showList = (users: UserList["users"]) => {
    if (!!users.length) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    showList(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    return () => {
      document.removeEventListener("click", handleShow.bind(null, !show), true);
    };
  });

  return (
    show && (
      <div className={styles.result}>
        {users.map((user, i) => (
          <div key={user.id} className={styles.user}>
            <Image
              height={50}
              width={50}
              src={user.avatar}
              alt={user.username}
            />
            <span>{user.username}</span>
          </div>
        ))}
      </div>
    )
  );
};

export default SearchList;
