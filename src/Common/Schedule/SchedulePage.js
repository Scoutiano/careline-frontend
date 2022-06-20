import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import UserProfile from "../Authentication/UserProfile";
import { Redirect } from "react-router-dom";
import StudentSchedule from "./StudentSchedule";
import { Form } from "react-bootstrap";
import CounselorSchedule from "./CounselorSchedule";
import TopNav from "../../Student/Navigation/TopNav/TopNav";
import Footer from "../Authentication/Footer/footer";

export const SchedulePage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState(36);
  const [counselors, setCounselors] = useState([]);

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isAuthenticated = () => {
    if (
      UserProfile.getRole() !== "STUDENT" &&
      UserProfile.getRole() !== "COUNSELOR"
    ) {
      setRedirect("/home");
    }
  };

  if (redirect !== null) {
    <Redirect to={redirect} />;
  }
  if (loading === true) {
    return <div></div>;
  }
  return (
    <>
      <TopNav />
      <div></div>
      <div className="d-flex flex-column container-fluid col-8 justify-content-center shadow-lg">
        {UserProfile.getRole() === "STUDENT" ? (
          <>
            <StudentSchedule className="shadow-lg" />;
          </>
        ) : (
          <>
            <CounselorSchedule className="shadow-lg" />
          </>
        )}
      </div>
    </>
  );
};
