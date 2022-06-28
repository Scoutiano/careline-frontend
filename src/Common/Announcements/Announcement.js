import { Container, Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import React from "react";
import styles from "./Announcement.module.css";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import UserProfile from "../Authentication/UserProfile";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Announcement = () => {
  const [redirect, setRedirect] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get("/event").catch(function (error) {
      if (error.status === 401) {
        setRedirect("/logout");
      }
    });
    setEvents(data);
  };

  const isAuthenticated = () => {
    console.log(UserProfile.getRole());
    if (UserProfile.getRole() !== "STUDENT") {
      setRedirect("/home");
      if (UserProfile.getRole() === null) {
        setRedirect("/login");
      }
    }
  };



  function formatDate(creationDate) {
    var date = new Date(creationDate.substring(0, 10));

    date.setFullYear(creationDate.substring(0, 4));
    date.setMonth(creationDate.substring(5, 7) - 1);
    date.setDate(creationDate.substring(8, 10));
    date.setHours(creationDate.substring(11, 13));
    date.setMinutes(creationDate.substring(14, 16));

    var AMorPM = "AM";
    var hours = date.getHours();

    if (date.getHours() > 12) {
      hours = hours - 12;
      AMorPM = "PM";
    }

    var res =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      hours +
      ":" +
      date.getMinutes() +
      " " +
      AMorPM;

    return res;
  }

  const renderEvent = (event, index) => {
    if (redirect !== "") {
      return <Redirect to={redirect} />;
    } else {
      return (
        <Col>
          <Card key={index}>
            <Card.Body>
              <Card.Title>{event.eventTitle}</Card.Title>
              <Card.Text className="text-muted">{event.eventDetails}</Card.Text>
              <Nav.Link href={"/eventInfo?id=" + event.id}>
                <Button variant="primary">More info</Button>
              </Nav.Link>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                {formatDate(event.eventDate)}
              </small>
            </Card.Footer>
          </Card>
        </Col>
      );
    }
  };
  return (
    <>
      <CardGroup>
        <Row xs={1} md={3} className="g-4">
          {events.map(renderEvent)}
        </Row>

        {/* "Card ms-5 shadow"  */}
      </CardGroup>
    </>
  );
};
export default Announcement;
