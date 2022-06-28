import React, { useState } from "react";
import { Navbar } from "react-bootstrap";

import "./TopNav.css";
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
import { Link } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";

const TopNav = () => {
  // const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <Navbar collapseOnSelect className="header">
        {/* <div > */}
        <div className="sidebarStyle">
          <SideBar />
        </div>
        <Link to="/home">
          <p className="careLine">CareLine</p>
        </Link>

        {/* </div> */}
      </Navbar>
    </>
  );
};
export default TopNav;
