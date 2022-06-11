import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Dashboard.css";
import TopNav from "../top-nav";

import "react-calendar/dist/Calendar.css";
import Homepage from "./Homepage";
import LeftPanel from "./LeftPanel/LeftPanel";

export default class Dashboard extends Component {
  render() {
    return (
      //   <div className="container-fluid bg-light">
      <div className="row flex-nowrap">
        <LeftPanel />
        <Homepage />
      </div>
      //   </div>
    );
  }
}
