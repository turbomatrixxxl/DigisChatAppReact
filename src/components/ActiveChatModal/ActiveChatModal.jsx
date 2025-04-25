import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ActiveChatModal.module.css";
import { useChats } from "../../hooks/useChats";

export default function ActiveChatModal({ chats, closeModal }) {
  const modalRef = useRef();
  const { visitedChatIds } = useChats();

  // Close the modal if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const activeChats = chats.filter((chat) => visitedChatIds.includes(chat.id));

  return (
    <div ref={modalRef}>
      {activeChats.length === 0 ? (
        <p className={styles.noActive}>There are no active chats !</p>
      ) : (
        <ul className={styles.chatList}>
          {activeChats.map((chat) => (
            <li key={chat.id} className={styles.chatListItem}>
              <Link to={`/chat/${chat.id}`} onClick={closeModal}>
                <img
                  src={chat.user.avatar}
                  alt="Avatar"
                  className={styles.avatar}
                  loading="lazy"
                />
                <div className={styles.usersInfo}>
                  <span className={styles.userName}>{chat?.user?.id}</span>
                  <span className={styles.reply}>Reply to message</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Prop Types Validation
ActiveChatModal.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  closeModal: PropTypes.func.isRequired,
};
