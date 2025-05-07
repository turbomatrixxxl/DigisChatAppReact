import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useChats } from "../../hooks/useChats";

import clsx from "clsx";

import ActiveChatModal from "../ActiveChatModal/ActiveChatModal";

import { FaEllipsisH } from "react-icons/fa";

import styles from "./Header.module.css";

function Header() {
  const { chatId } = useParams();
  const { chats } = useChats();
  const selectedChat = chats.find((chat) => chat.id === chatId);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <div style={{ position: "relative" }}>
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
        <button className={clsx(styles.rightContButton)} onClick={toggleModal}>
          <FaEllipsisH size={16} className={styles.button} />
        </button>
      </header>

      {showModal && <ActiveChatModal chats={chats} closeModal={toggleModal} />}
    </div>
  );
}

export default Header;
