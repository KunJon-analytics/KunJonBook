"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { ChatDocument, AddMessageDocument } from "@/gql/graphql";
import styles from "../page.module.css";

const Chat = (props: { chatId: number; closeChat: (id: number) => void }) => {
  const { chatId, closeChat } = props;
  const { error, data } = useSuspenseQuery(ChatDocument, {
    variables: { chatId },
  });
  const [text, setText] = useState("");
  const [addMessage] = useMutation(AddMessageDocument, {
    update(cache, { data: returnedData }) {
      if (returnedData && data.chat) {
        cache.modify({
          id: cache.identify(data.chat),
          fields: {
            messages(existingMessages = []) {
              const newMessageRef = cache.writeFragment({
                data: returnedData.addMessage,
                fragment: gql`
                  fragment NewMessage on Chat {
                    id
                    type
                  }
                `,
              });
              return [...existingMessages, newMessageRef];
            },
          },
        });
      }
    },
  });

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && text.length) {
      addMessage({ variables: { message: { text, chatId } } }).then(() => {
        setText("");
      });
    }
  };

  if (error)
    return (
      <div className="chatWindow">
        <p>{error.message}</p>
      </div>
    );

  const { chat } = data;

  return (
    <div className={styles["chatWindow"]}>
      <div className={styles.header}>
        <span>{chat?.users && chat.users[1].username}</span>
        <button onClick={() => closeChat(chatId)} className={styles.close}>
          X
        </button>
      </div>
      <div className={styles.messages}>
        {chat?.messages &&
          chat.messages.map((message) => (
            <div
              key={"message" + message.id}
              className={`${styles.message} ${
                message.user.id > 1 ? styles.left : styles.right
              }`}
            >
              {message.text}
            </div>
          ))}
      </div>
      <div className={styles.input}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </div>
    </div>
  );
};

export default Chat;
