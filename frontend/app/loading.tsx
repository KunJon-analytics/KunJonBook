import React from "react";
import styles from "./page.module.css";

interface Style {
  backgroundColor: string;
  width: number;
  height: number;
  color?: string | undefined;
}

interface Props {
  color?: string;
  size?: number;
}

const Loading = ({ color, size }: Props) => {
  let style: Style = {
    backgroundColor: "#6ca6fd",
    width: 40,
    height: 40,
  };

  if (typeof color !== typeof undefined) {
    style.color = color;
  }
  if (size) {
    style.width = size;
    style.height = size;
  }

  return <div className={styles.bouncer} style={style}></div>;
};

export default Loading;
