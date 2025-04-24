import React from "react";

// import NavLinks from "../NavLinks/NavLinks";

import clsx from "clsx";

import { FaEllipsisH } from "react-icons/fa";

// import NavModal from "../NavModal/NavModal";

import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <header className={clsx(styles.header)}>
        <div className={clsx(styles.leftCont)}></div>
        <button className={clsx(styles.rightContButton)}>
          <FaEllipsisH size={16} className={styles.button} />
        </button>
      </header>
    </>
  );
}

export default Header;
