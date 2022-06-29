import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import styles from "./TopNav.module.css";
import { Link } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import UserProfile from "../../../Common/Authentication/UserProfile";

const TopNav = () => {
  // const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const isAuthenticated = () => {
  //   console.log(UserProfile.getRole());
  //   if (UserProfile.getRole() !== null) {
  //     setIsLoggedIn(true)
  //   }
  // }
  // useEffect(() => {
  //   isAuthenticated();
  // }, [isAuthenticated])


  return (
    <>
      {/* collapseOnSelect */}
      <Navbar className={styles.navtop}>
        {/* <div > */}
        {/* <div className={styles.sidebarStyle}> */}
        <SideBar />
        {/* </div> */}
        <Link to="/home">
          <p className={styles.careLine}>CareLine</p>
        </Link>
        {/* {isLoggedIn && <Link to="/logout">
          <p >Logout</p>
        </Link>} */}

      </Navbar>
    </>
  );
};
export default TopNav;
