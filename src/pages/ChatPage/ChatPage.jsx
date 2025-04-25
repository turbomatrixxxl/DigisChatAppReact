import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateChat } from "../../redux/public/chatsSlice";
import { useParams } from "react-router-dom";
import { useChats } from "../../hooks/useChats";
import Input from "../../components/commonComponents/Input/Input";

import { FaPaperclip, FaRegSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

import styles from "./ChatPage.module.css";

export default function ChatPage() {
  const { chatId } = useParams();
  const { chats } = useChats();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null); // State for selected file
  const fileInputRef = useRef();

  const selectedChat = chats.find((chat) => chat.id === chatId);

  if (!selectedChat) {
    return <div className={styles.notFound}>Chat not found</div>;
  }

  const formatTimestamp = (timestamp) => {
    let date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      const fixedTimestamp = timestamp.replace(
        /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}):(\d{2})\.(\d{3})Z$/,
        "$1:59.$3Z"
      );
      date = new Date(fixedTimestamp);
    }
    if (isNaN(date.getTime())) return "";

    if (date.getSeconds() > 59) date.setSeconds(59);

    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}-${formattedTime}`;
  };

  const handleSendMsg = () => {
    if (!message.trim()) return;

    dispatch(
      updateChat({
        chatId,
        newMessages: [
          {
            id: crypto.randomUUID(),
            content: message,
            isInbox: false,
            sentAt: new Date().toISOString(),
          },
        ],
      })
    );
    setMessage("");
    setShowEmojiPicker(false);
    setFile(null); // Reset file state after sending the message
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the selected file to state
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
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
        {/* File preview section */}
        {file && (
          <li className={styles.filePreview}>
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="File Preview"
                className={styles.imagePreview}
              />
            ) : (
              <span>{file.name}</span> // For non-image files
            )}
          </li>
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
          <button
            type="button"
            className={styles.writeMsgButton}
            onClick={handleAttachClick}
          >
            <FaPaperclip className={styles.paperClipIcon} size={18} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <div className={styles.emojiWrapper}>
            <button
              type="button"
              className={styles.writeMsgButton}
              onClick={toggleEmojiPicker}
            >
              <FaRegSmile className={styles.smileIcon} size={18} />
            </button>
            {showEmojiPicker && (
              <div className={styles.emojiPicker}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </Input>

        <button className={styles.sendMsgButton} onClick={handleSendMsg}>
          <FaPaperPlane className={styles.sendIcon} size={24} />
        </button>
      </div>
    </div>
  );
}
