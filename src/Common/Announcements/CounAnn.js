import { Container, Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import React, { useEffect } from 'react';
import './Announcement.css'
import { FaPlusCircle } from "react-icons/fa";

const Announcement = (props) => {
    const eventInfo = [
        { eventTitle: "yes", eventDetails: "B", eventDate: "2022-06-15 15:00", registeredStudents: [] },
        { eventTitle: "yes", eventDetails: "Bootstrap cards are one of the most used bootstrap components. Cards provide an easy way to align the content with a flexible and extensible container. Cards ...Bootstrap cards are one of the most used ..", eventDate: "13/5/2020", registeredStudents: [] },
        { eventTitle: "yes", eventDetails: "Bootstrap cards are one of the most used bootstrap components. Cards provide an easy way to align the content with a flexible and extensible container. Cards ...Bootstrap cards are one of the most used bootstrap components. Cards provide an easy way to align the content with a flexible and extensible container. Cards ...", eventDate: "13/5/2020", registeredStudents: [] },
        { eventTitle: "yes", eventDetails: "Bootstrap cards are one of the most used bootstrap components. Cards provide an easy way to align the content with a flexible and extensible container. Cards ...Bootstrap cards are one of the most used bootstrap components. Cards provide an easy way to align the content with a flexible and extensible container. Cards ...", eventDate: "13/5/2020", registeredStudents: [] },
    ];
    const updteEventStatus = () => {

    }
    const renderEvent = (event, index) => {
        return (
            <Col>
                <Card key={index} >
                    <Card.Body className='card-body-ann'>
                        <Card.Title>{event.eventTitle}</Card.Title>
                        <Card.Text className="text-muted overflow-hidden ">
                            {event.eventDetails}
                        </Card.Text>
                        <Nav.Link href="/addEvent">
                            <Button editMode={true}
                                variant="primary">Edit</Button>
                        </Nav.Link>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">
                            {event.eventDate}
                        </small>
                    </Card.Footer>
                </Card >
            </Col >
        )
    }
    return (
        <>
            <CardGroup>
                <Row xs={1} md={3} classNme='g-4'>
                    {eventInfo.map(renderEvent)}
                </Row>

                {/* "Card ms-5 shadow"  */}
                <Card className='h-100' style={{ width: "18rem" }}>

                    <Card.Body className='card-body-ann'>
                        <div className="addEvent">
                            <Card.Title>Add an event</Card.Title>
                            <Nav.Link href="/addEvent">
                                <FaPlusCircle size={80} color='grey' />
                            </Nav.Link >
                        </div>
                    </Card.Body>

                </Card>

            </CardGroup>
        </>
    )
}
export default Announcement;