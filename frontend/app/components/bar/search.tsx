"use client";

import React, { useState } from "react";
import styles from "../../page.module.css";
import SearchList from "./searchList";
import { useUserSearchQuery } from "@/graphql/query/usersSearch";

const SearchBar = () => {
  const [text, setText] = useState("");
  const { error, data } = useUserSearchQuery(text);

  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={styles.search}>
      <input type="text" onChange={changeText} value={text} />
      {!error && data?.usersSearch && <SearchList data={data} />}
    </div>
  );
};

export default SearchBar;
