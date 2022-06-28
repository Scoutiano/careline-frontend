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
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isAuthenticated = () => {
    if (
      UserProfile.getRole() !== "STUDENT" &&
      UserProfile.getRole() !== "COUNSELOR"
    ) {
      setRedirect("/login");
    }
  };

  if (redirect !== null) {
    return <Redirect to={redirect} />;
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
