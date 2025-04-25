import React from "react";
import { useParams } from "react-router-dom";

import { useChats } from "../../hooks/useChats";

import clsx from "clsx";

import { FaEllipsisH } from "react-icons/fa";

// import NavModal from "../NavModal/NavModal";

import styles from "./Header.module.css";

function Header() {
  const { chatId } = useParams();
  console.log(chatId);

  const { chats } = useChats();

  const selectedChat = chats.find((chat) => chat.id === chatId);

  return (
    <>
      <header className={clsx(styles.header)}>
        {selectedChat && (
          <div className={styles.chatInfo}>
            <img
              src={selectedChat.user.avatar}
              alt="Avatar"
              className={styles.avatar}
            />
            <div className={styles.usersInfo}>
              <span className={styles.userName}>{selectedChat.user.id}</span>
              <span className={styles.reply}>Reply to message</span>
            </div>
          </div>
        )}
        <button className={clsx(styles.rightContButton)}>
          <FaEllipsisH size={16} className={styles.button} />
        </button>
      </header>
    </>
  );
}

export default Header;
