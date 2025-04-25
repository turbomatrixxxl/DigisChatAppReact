import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { accessChat } from "../../redux/public/chatsSlice"; // Assuming this is your async action

import { useChats } from "../../hooks/useChats";

import clsx from "clsx";

import styles from "./ChatsList.module.css";

export default function ChatsList({ search }) {
  const { chats } = useChats();
  const [reloadMap, setReloadMap] = useState({});
  const dispatch = useDispatch();

  const handleImageError = (chatId) => {
    setTimeout(() => {
      setReloadMap((prev) => ({
        ...prev,
        [chatId]: (prev[chatId] || 0) + 1,
      }));
    }, 1000);
  };

  const getLastInboxMessage = (chat) => {
    const inboxMessages = chat.messages.filter((msg) => msg.isInbox);
    if (!inboxMessages.length) return null;
    return inboxMessages.reduce((latest, msg) =>
      new Date(msg.sentAt) > new Date(latest.sentAt) ? msg : latest
    );
  };

  const filteredChats = chats.filter((chat) =>
    chat.user.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ul className={styles.list}>
      {filteredChats.map((chat) => (
        <NavLink
          to={`/chat/${chat.id}`}
          key={chat.id}
          className={({ isActive }) =>
            clsx(styles.listItem, { [styles.active]: isActive })
          }
          onClick={() => dispatch(accessChat({ chatId: chat.id }))}
        >
          <div className={styles.imgCont}>
            <img
              key={reloadMap[chat.id] || 0}
              className={styles.userImg}
              src={chat?.user?.avatar}
              alt="User img"
              loading="lazy"
              onError={() => handleImageError(chat.id)}
            />
            <div
              className={clsx(
                styles.isOnline,
                chat?.user?.isOnline ? styles.online : styles.notOnline
              )}
            ></div>
          </div>
          <div className={styles.infoCont}>
            <p className={styles.name}>{chat?.user?.id}</p>
            <p className={styles.lastMessage}>
              {getLastInboxMessage(chat)?.content || "No messages yet"}
            </p>
          </div>
        </NavLink>
      ))}
    </ul>
  );
}
