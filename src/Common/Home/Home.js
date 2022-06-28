import React, { useEffect, useState } from "react";
import TopNav from "../../Student/Navigation/TopNav/TopNav";
import Announcement from "../Announcements/Announcement";
// import Footer from "../Authentication/Footer/footer";
import styles from "./Home.module.css";
import UserProfile from "../Authentication/UserProfile";
import CounAnnouncement from "../Announcements/CounAnnouncement";

const Home = () => {
  const [isCoun, setIsCoun] = useState("");
  const isAuthenticated = () => {
    console.log(UserProfile.getRole());
    if (UserProfile.getRole() === "COUNSELOR") {
      setIsCoun(true);
    }
  };

  const updateRole = () => {
    setIsCoun(isCoun);
  }
  useEffect(() => {
    updateRole();
  }, [setIsCoun])
  return (
    <div class={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <TopNav />
      </div>
      <div className={styles.middleContainer}>
        {isCoun ? <CounAnnouncement /> : <Announcement />}

      </div>

    </div>
  );
}
export default Home;