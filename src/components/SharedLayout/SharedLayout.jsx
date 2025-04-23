import React from "react";
// import { useMediaQuery } from "react-responsive";

import { Outlet } from "react-router-dom";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

import "react-toastify/dist/ReactToastify.css";

import clsx from "clsx";

import styles from "./SharedLayout.module.css";

function SharedLayout() {
  return (
    <div className={styles.cont}>
      <div className={clsx(styles.content)}>
        {/* <Header /> */}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default SharedLayout;
