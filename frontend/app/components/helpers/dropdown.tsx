import React, { useState, useRef, useEffect } from "react";

import styles from "../../page.module.css";
import { assertIsNode } from "@/lib/utility";

const Dropdown = ({
  trigger,
  children,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef);

  function useOutsideClick(ref: React.MutableRefObject<HTMLDivElement | null>) {
    useEffect(() => {
      function handleClickOutside({ target }: MouseEvent) {
        assertIsNode(target);
        if (ref.current && !ref.current.contains(target)) {
          setShow(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div className={styles.dropdown}>
      <div>
        <div className={styles.trigger} onClick={() => setShow(!show)}>
          {trigger}
        </div>
        <div ref={wrapperRef}>
          {show && <div className={styles.content}>{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
