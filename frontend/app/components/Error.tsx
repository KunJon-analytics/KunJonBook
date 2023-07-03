import React from "react";
import styles from "../page.module.css";

const Error = ({ children }: { children: React.ReactNode }) => {
  return <div className={`${styles.error} ${styles.message}`}>{children}</div>;
};

export default Error;
