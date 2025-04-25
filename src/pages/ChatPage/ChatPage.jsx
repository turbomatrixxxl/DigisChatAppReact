import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useChats } from "../../hooks/useChats";

import Input from "../../components/commonComponents/Input/Input";

import { FaPaperclip } from "react-icons/fa"; // Paperclip icon
import { FaRegSmile } from "react-icons/fa"; // Regular style smile icon
import { FaPaperPlane } from "react-icons/fa"; // Send (paper plane) icon

import styles from "./ChatPage.module.css";

export default function ChatPage() {
  const { chatId } = useParams();
  const { chats } = useChats();

  const [message, setMessage] = useState("");

  const selectedChat = chats.find((chat) => chat.id === chatId);

  if (!selectedChat) {
    return <div className={styles.notFound}>Chat not found</div>;
  }

  const formatTimestamp = (timestamp) => {
    let date = new Date(timestamp);

    // If the timestamp is invalid, we'll try to adjust it
    if (isNaN(date.getTime())) {
      // Try to trim or fix invalid timestamp parts (e.g., seconds out of range)
      const fixedTimestamp = timestamp.replace(
        /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}):(\d{2})\.(\d{3})Z$/,
        "$1:59.$3Z"
      );
      date = new Date(fixedTimestamp);
    }

    // Ensure the timestamp is valid after the fix
    if (isNaN(date.getTime())) {
      return ""; // If invalid even after attempting fix, just return empty string
    }

    // Fix seconds if greater than 59
    if (date.getSeconds() > 59) {
      date.setSeconds(59);
    }

    // Format the time without seconds
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format the date as 3March2025
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Combine date and time
    const formattedDate = `${day}${month}${year}`;

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className={styles.chatPage}>
      <ul className={styles.messageList}>
        {selectedChat.messages.map((msg) =>
          msg.isInbox ? (
            <li key={msg.id} className={styles.outbox}>
              <span className={styles.ownerName}>Radu Bogdan</span>
              <span className={styles.msgOutboxContent}>{msg.content}</span>
              <span className={styles.timestampOutbox}>
                {msg.sentAt
                  ? formatTimestamp(msg.sentAt)
                  : "Time not available"}
              </span>
            </li>
          ) : (
            <li key={msg.id} className={styles.inbox}>
              <span className={styles.msgInboxContent}>{msg.content}</span>
              <span className={styles.timestampInbox}>
                {msg.sentAt
                  ? formatTimestamp(msg.sentAt)
                  : "Time not available"}
              </span>
            </li>
          )
        )}
      </ul>
      <div className={styles.sendMsgCont}>
        <Input
          width={"100%"}
          className={styles.sendMsgInput}
          paddingLeft={"20px"}
          placeholder={"Type something here..."}
          value={message}
          handleChange={(e) => setMessage(e.target.value)}
        >
          <button className={styles.writeMsgButton}>
            <FaPaperclip className={styles.paperClipIcon} size={18} />
          </button>
          <button className={styles.writeMsgButton}>
            <FaRegSmile className={styles.smileIcon} size={18} />
          </button>
        </Input>
        <button className={styles.sendMsgButton}>
          <FaPaperPlane className={styles.sendIcon} size={24} />
        </button>
      </div>
    </div>
  );
}
