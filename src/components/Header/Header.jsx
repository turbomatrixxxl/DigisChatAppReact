import React from "react";

// import NavLinks from "../NavLinks/NavLinks";

import clsx from "clsx";

// import NavModal from "../NavModal/NavModal";

import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <header className={clsx(styles.header)}>
        <div className={clsx(styles.leftCont)}></div>
      </header>
    </>
  );
}

export default Header;
