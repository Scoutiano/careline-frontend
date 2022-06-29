import React, { useEffect, useState } from "react";
import TopNav from "../../Student/Navigation/TopNav/TopNav";
import Announcement from "../Announcements/Announcement";
// import Footer from "../Authentication/Footer/footer";
import styles from "./Home.module.css";
import UserProfile from "../Authentication/UserProfile";
import CounAnnouncement from "../Announcements/CounAnnouncement";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [redirect, setRedirect] = useState(null);

  const isAuthenticated = () => {
    if (UserProfile.getRole() === null) {
      setRedirect("/login");
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

  return (
    <div class={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <TopNav />
      </div>
      <div className={styles.middleContainer}>
        {UserProfile.getRole() === "COUNSELOR" ? (
          <CounAnnouncement />
        ) : (
          <Announcement />
        )}
      </div>
    </div>
  );
};
export default Home;
