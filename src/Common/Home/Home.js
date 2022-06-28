import React from "react";
import TopNav from "../../Student/Navigation/TopNav/TopNav";
import Announcement from "../Announcements/Announcement";
import Footer from "../Authentication/Footer/footer";
import Card from "../Card/Card";
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div class={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <TopNav />
      </div>
      <div className={styles.middleContainer}>
        <Announcement />
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );

};
