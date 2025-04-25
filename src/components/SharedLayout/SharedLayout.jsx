import React, { useState } from "react";
import { useChats } from "../../hooks/useChats";

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Input from "../commonComponents/Input/Input";
import ChatsList from "../ChatsList/ChatsList";

import "react-toastify/dist/ReactToastify.css";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "./SharedLayout.module.css";

function SharedLayout() {
  const { activeChats } = useChats();

  const [search, setSearch] = useState("");

  return (
    <div className={styles.cont}>
      <div className={styles.mainContent}>
        <aside className={styles.aside}>
          <header className={styles.asideHeader}>
            <p className={styles.asideHeaderTitle}>Active Conversations</p>
            <div className={styles.asideHeaderCounter}>{activeChats}</div>
          </header>
          <div className={styles.asideContent}>
            <Input
              className={styles.asideInput}
              paddingLeft={"18px"}
              placeholder={"Search..."}
              value={search}
              handleChange={(e) => setSearch(e.target.value)}
            >
              <button className={styles.asideInputButton}>
                <FontAwesomeIcon
                  className={styles.asideInputSearchIcon}
                  icon={faMagnifyingGlass}
                />
              </button>
            </Input>
            <div className={styles.asideChatListCont}>
              <ChatsList search={search} />
            </div>
          </div>
        </aside>
        <div className={clsx(styles.content)}>
          <Header />
          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SharedLayout;
