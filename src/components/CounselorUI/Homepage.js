import { Container, Card, CardGroup, Button, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import React from "react";
import TopNav from "../top-nav";

const Homepage = () => {
  return (
    <div>
      <TopNav />
      <>
        <Container className="col m-4 py-3 text-body container-fluid">
          <h1 className="shadow-sm mb-4 p-3 rounded bg-white">
            Activity Dashboard
          </h1>

          <Row>
            <Col className="col-9">
              <CardGroup className="CardGroup mb-5 p-4 border-1 shadow">
                <Card className="border-0">
                  <Card.Body className="mx-auto my-2 container-fluid">
                    <h3 className="mb-3 ms-5 ps-3">Upcoming Events</h3>
                  </Card.Body>
                </Card>

                <Card className="Card border-0">
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card className="Card border-1 ">
                          <Card.Title className="mx-auto display-3 text-success">
                            0
                          </Card.Title>
                          <Card.Body className="mx-auto pt-2">
                            <Card.Text className="px-3">
                              Sessions done
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="Card border-1">
                          <Card.Title className="mx-auto display-3 text-info">
                            0
                          </Card.Title>
                          <Card.Body className="mx-auto pt-2">
                            <Card.Text className="px-3">
                              Tickets created
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Card className="Card border-1 ">
                          <Card.Title className="mx-auto display-3 text-success">
                            0
                          </Card.Title>
                          <Card.Body className="mx-auto pt-2">
                            <Card.Text className="px-3">
                              Sessions reject
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="Card border-1">
                          <Card.Title className="mx-auto display-3 text-info">
                            0
                          </Card.Title>
                          <Card.Body className="mx-auto pt-2">
                            <Card.Text className="px-3">
                              Tickets solved
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>

            <Col className="col-3">
              <Card className="Card mb-5 p-0 shadow" style={{ width: "" }}>
                <Card.Body>
                  <Card.Title className="mx-auto">
                    <svg
                      className="bi bi-bell mx-auto me-2 my-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                    Notifications
                  </Card.Title>
                  <Card.Text className="text-muted">
                    This is your notification center.
                  </Card.Text>
                  <Button variant="primary"> Visit Page</Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>

              <Card className="Card mb-5 p-0 shadow" style={{ width: "" }}>
                <Card.Body>
                  <Card.Title className="mx-auto">
                    <svg
                      className="bi bi-clock mx-auto me-2 my-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                    </svg>
                    Hours Spent
                  </Card.Title>

                  <Card.Text className="text-muted display-3 mb-4">
                    1.3
                  </Card.Text>
                  <Card.Text className="text-muted">
                    You can view the total hours spent on this website.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>

              <Card className="Card mb-5 p-0 shadow" style={{ width: "" }}>
                <Card.Body>
                  <Card.Title className="mx-auto">
                    <svg
                      className="bi bi-calendar2-check mx-auto me-2 my-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                      <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                    </svg>
                    Monthly Report
                  </Card.Title>
                  <Card.Text className="text-muted">
                    You are able to view their monthly auto generated report.
                  </Card.Text>
                  <Button variant="primary"> Visit Page</Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>

              <Card className="Card mb-5 p-0 shadow" style={{ width: "" }}>
                <Card.Body>
                  <Card.Title className="mx-auto">
                    <svg
                      className="bi bi-clipboard-plus mx-auto me-2 my-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"
                      />
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                    Featured Posts
                  </Card.Title>
                  <Card.Text className="text-muted">
                    We picked the best posts for you. Enjoy!
                  </Card.Text>
                  <Button variant="primary"> Visit Page</Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    </div>
  );
};

export default Homepage;
