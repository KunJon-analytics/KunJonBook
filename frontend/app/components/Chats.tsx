"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { backendUrl } from "../constants";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { ChatsDocument } from "@/gql/graphql";
import Chat from "./Chat";
import Loading from "../loading";

const usernamesToString = (
  users: {
    username: string;
    id: number;
    avatar: string;
  }[]
) => {
  const userList = users.slice(1);
  let usernamesString = "";

  for (let i = 0; i < userList.length; i++) {
    usernamesString += userList[i].username;
    if (i - 1 === userList.length) {
      usernamesString += ", ";
    }
  }
  return usernamesString;
};

const shorten = (text: string) => {
  if (text.length > 12) {
    return text.substring(0, text.length - 9) + "...";
  }

  return text;
};

const Chats = () => {
  const { data, error } = useSuspenseQuery(ChatsDocument);

  const [openChats, setOpenChats] = useState<number[]>([]);

  const openChat = (id: number) => {
    let openChatsTemp = openChats.slice();

    if (openChatsTemp.indexOf(id) === -1) {
      if (openChatsTemp.length > 2) {
        openChatsTemp = openChatsTemp.slice(1);
      }
      openChatsTemp.push(id);
    }

    setOpenChats(openChatsTemp);
  };

  const closeChat = (id: number) => {
    let openChatsTemp = openChats.slice();

    const index = openChatsTemp.indexOf(id);
    openChatsTemp.splice(index, 1), setOpenChats(openChatsTemp);
  };

  if (error) return `Error! ${error.message}`;
  return (
    <div className={styles.wrapper}>
      <div className={styles.chats}>
        {data.chats?.map((chat, i) => (
          <div
            key={"chat" + chat.id}
            className={styles.chat}
            onClick={() => openChat(chat.id)}
          >
            {chat.users && (
              <div className={styles.header}>
                <Image
                  src={
                    chat.users.length > 2
                      ? `${backendUrl}/uploads/group.png`
                      : chat.users[1].avatar
                  }
                  alt={`${chat.id} avatar`}
                  width={50}
                  height={50}
                />
                <div>
                  <h2>{shorten(usernamesToString(chat.users))}</h2>
                  <span>{chat?.lastMessage?.text}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles["openChats"]}>
        {openChats.map((chatId, i) => (
          <Suspense fallback={<Loading />} key={"chatWindow" + chatId}>
            <Chat
              chatId={chatId}
              key={"chatWindow" + chatId}
              closeChat={closeChat}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default Chats;
