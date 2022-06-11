import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const TicketForm = () => {
  const [ticket, setTicket] = new useState({
    title: null,
    content: null,
    priority: null,
  });

  const [ticketId, setTicketId] = new useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();

    ticket.title = e.target.TitleTF.value;
    ticket.content = e.target.ContentTA.value;
    ticket.priority = e.target.PriorityS.value;

    axios({
      method: "post",
      url: "/ticket",
      data: ticket,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setTicketId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (ticketId !== -1) {
    return <Redirect to={"ticket?id=" + ticketId} />;
  }
  return (
    <Container className="col-lg-5 col-md-5 col-sm-12 bg-white rounded">
      <Row>
        <Col className="p-2">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="TitleTF">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="title"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="ContentTA">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="PriorityS">
              <Form.Label>Priority</Form.Label>
              <Form.Select>
                <option>Choose priority</option>
                <option className="text-danger" value="URGENT">
                  Urgent
                </option>
                <option className="text-warning" value="INTERMEDIATE">
                  Intermediate
                </option>
                <option className="text-success" value="NORMAL">
                  Normal
                </option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Ticket
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TicketForm;
