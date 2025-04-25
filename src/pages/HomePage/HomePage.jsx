import React from "react";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={styles.section}>
      <h1 className={styles.welcome}>Welcome to the Chat App!</h1>
      <h2 className={styles.indications}>
        Select a chat from the sidebar to start your conversation.
      </h2>
      <h3 className={styles.encourage}>Enjoy...!</h3>
    </section>
  );
}
