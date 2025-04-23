import React from "react";

import { Outlet } from "react-router-dom";

import styles from "./HomePage.module.css";

export default function HomePage() {
  // const { result } = usePublic();
  // console.log(result?.recommendedDailyCaloriesIntake);

  return (
    <section className={styles.section}>
      <Outlet />
    </section>
  );
}
