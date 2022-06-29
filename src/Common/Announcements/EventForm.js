import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import SideBar from "../../Student/Navigation/Sidebar/SideBar";
import TopNav from "../../Student/Navigation/TopNav/TopNav";
import DateTimePicker from "react-datetime-picker";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import CounselorSchedule from "../Schedule/CounselorSchedule";
import { useLocation } from "react-router-dom";

const EventForm = (props) => {
  const [event, setEvent] = new useState({
    eventTitle: null,
    eventDetails: null,
    eventDate: null,
  });

  const location = useLocation();

  const [eventId, setEventId] = useState(-1);

  useEffect(() => {
    console.log("State: ", location.state);
    if (location.state.editMode) {
      const fetchData = async () => {
        const { data } = await axios.get("/event/" + location.state.eventId);
        setEvent(data);
        console.log("event ", event);
      };

      console.log(event);
      fetchData();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location.state.editMode === undefined) {
      event.eventTitle = e.target.TitleTF.value;
      event.eventDetails = e.target.ContentTA.value;
      event.eventDate = e.target.dateDP.value;

      console.log(event);
      axios({
        method: "post",
        url: "/event",
        data: event,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          setEventId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      event.eventTitle = e.target.TitleTF.value;
      event.eventDetails = e.target.ContentTA.value;
      event.eventDate = e.target.dateDP.value;

      console.log(event);
      axios({
        method: "put",
        url: "/event/" + event.id,
        data: event,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          setEventId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (eventId !== -1) {
    return <Redirect to={"/eventInfo?id=" + eventId} />;
  }

  return (
    <>
      <TopNav />
      <Container fluid className="d-flex">
        <Container className="col-lg-5 col-md-5 col-sm-12 bg-white rounded justify-content-center">
          <Row class>
            <Col className="p-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="TitleTF">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="title"
                    required
                    value={event.eventTitle === null ? "" : event.eventTitle}
                  >
                    {/* {event.eventTitle} */}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ContentTA">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    value={
                      event.eventDetails === null ? "" : event.eventDetails
                    }
                  >
                    {/* {event.eventDetails} */}
                  </Form.Control>
                </Form.Group>
                <DateTimePickerComponent
                  step={10}
                  format="yyyy-MM-dd HH:mm"
                  id="dateDP"
                  placeholder="When is this event happening?"
                  required
                  value={event.eventDate === null ? "" : event.eventDate}
                >
                  {/* {event.eventDate} */}
                </DateTimePickerComponent>
                <Button variant="primary" type="submit">
                  Submit Event
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default EventForm;
