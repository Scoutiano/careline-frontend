import { Nav } from "react-bootstrap";

import React from "react";
import TopNav from "../../Student/Navigation/TopNav/TopNav";
import "./MoreInfo.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UserProfile from "../Authentication/UserProfile";

const MoreInfoPage = () => {
  const [redirect, setRedirect] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [event, setEvent] = useState({});
  const [isRegistered, setIsRegistered] = useState("");

  const location = useLocation();

  useEffect(() => {
    isAuthenticated();
    retrieveEventId();
  }, []);

  const retrieveEventId = () => {
    const query = new URLSearchParams(location.search);
    setEventId(query.get("id"));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios
        .get("/event/" + eventId)
        .catch(function (error) {
          if (error.status === 401) {
            setRedirect("/logout");
          }
        });
      setEvent(data);
      console.log("events ", event);
    };

    fetchData();
  }, [eventId]);

  const isAuthenticated = () => {
    console.log(UserProfile.getRole());
    if (UserProfile.getRole() !== "STUDENT") {
      setRedirect("/home");
      if (UserProfile.getRole() === null) {
        setRedirect("/login");
      }
    }
  };
  const checkRegisteredList = () => {};
  return (
    <>
      <TopNav />
      <div className="container-fluid bg-light" id="viewport">
        <div className="row flex-nowrap">
          <div className="info">
            {event.eventDetails}
            <Nav.Link href="/student-registerEvent">
              <button disabled={isRegistered} className="buttonStyling">
                Register Here
              </button>
            </Nav.Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default MoreInfoPage;
