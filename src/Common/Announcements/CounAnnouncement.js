import { Container, Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { useEffect } from "react";
import "./CounAnnouncement.css";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import UserProfile from "../Authentication/UserProfile";
import { Link } from "react-router-dom";

const CounAnnouncement = (props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/event");
      setEvents(data);
      console.log("events ", events);
    };

    fetchData();
  }, []);

  const renderEvent = (event, index) => {
    return (
      <Col>
        <Card key={index}>
          <Card.Body className="card-body-ann">
            <Card.Title>{event.eventTitle}</Card.Title>
            <Card.Text className="text-muted overflow-hidden ">
              {event.eventDetails}
            </Card.Text>
            <Link
              to={{
                pathname: "/addEvent",
                state: { eventId: event.id, editMode: true },
              }}
            >
              <Button variant="primary" style={{ width: "100%" }}>
                Edit
              </Button>
            </Link>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{event.eventDate}</small>
          </Card.Footer>
        </Card>
      </Col>
    );
  };
  return (
    <>
      <CardGroup>
        <Row xs={1} md={3} classNme="g-4">
          {events.map(renderEvent)}
        </Row>

        {/* "Card ms-5 shadow"  */}
        <Card className="h-100" style={{ width: "18rem" }}>
          <Card.Body className="card-body-ann">
            <div className="addEvent">
              <Card.Title>Add an event</Card.Title>
              <Nav.Link href="/addEvent">
                <FaPlusCircle size={80} color="grey" />
              </Nav.Link>
            </div>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};
export default CounAnnouncement;
