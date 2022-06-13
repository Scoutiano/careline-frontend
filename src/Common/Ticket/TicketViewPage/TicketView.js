import React from "react";
import TicketCard from "./TicketViewCard";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserProfile from "../../Authentication/UserProfile";
import axios from "axios";
import { TicketReplyList } from "./TicketReplyList";
import { NotFound } from "../../PageNotFound/not-found";

const TicketView = ({ ticketId }) => {
  const location = useLocation();
  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketReplies, setTicketReplies] = new useState([]);

  useEffect(() => {
    setLoading(true);
    isAuthenticated();
    fetchReplies();
  }, []);

  const isAuthenticated = async () => {
    var data;
    await axios
      .get("/ticket/" + ticketId)
      .then(function (response) {
        setLoading(false);
        data = response.data;
      })
      .catch(function (error) {
        if (error.status === 403) {
          setRedirect("/home");
        }
        if (error.status === 401) {
          setRedirect("/logout");
        }
      });

    setTicket(data);

    if (
      UserProfile.getRole() !== "COUNSELOR" &&
      ticket.createdBy !== UserProfile.getId()
    ) {
      setRedirect("/home");
      if (UserProfile.getRole() === "") {
        setRedirect("/login");
      }
    }
  };

  const fetchReplies = async () => {
    const { data } = await axios.get("/ticket/reply/" + ticketId);
    setTicketReplies(data);
  };

  const updateTicketReplies = (newTicketReplies) => {
    setTicketReplies([...newTicketReplies]);
  };

  const handleSetStatus = (e) => {
    e.preventDefault();
    ticket.status = e.target.status_select.value;
    setTicket({ ...ticket });
    axios({
      method: "put",
      url: "/ticket/" + ticketId,
      data: ticket,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleSend = (e) => {
    e.preventDefault();

    if (UserProfile.getRole() === "COUNSELOR") {
      ticket.status = "IN_PROGRESS";
      setTicket({ ...ticket });
      axios({
        method: "put",
        url: "/ticket/" + ticketId,
        data: ticket,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const replyInfo = {
      content: e.target.reply_text.value,
    };

    axios({
      method: "post",
      url: "/ticket/reply/" + ticketId,
      data: replyInfo,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      (response) => {
        ticketReplies.push(response.data);
        const newTicketReplies = [...ticketReplies];
        setTicketReplies([...ticketReplies]);
      },
      function (error) {}
    );
  };
  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

  return (
    <div class="data-container col-md-6" id="ticket-view-container">
      {loading === true ? (
        <TicketCard
          key="1"
          id="loading"
          content="loading"
          title="loading"
          status="loading"
          priority="loading"
          creationDate="loading"
        />
      ) : ticket === null && loading === false ? (
        <NotFound />
      ) : (
        <div>
          <TicketCard
            key={ticket.id}
            id={ticket.id}
            content={ticket.content}
            title={ticket.title}
            status={ticket.status}
            priority={ticket.priority}
            creationDate={ticket.creationDate}
          />
          <div class="col-md-12 w-100 bg-white rounded-top">
            {UserProfile.getRole() === "COUNSELOR" ? (
              <div class="row mt-1 border-black">
                <div class="form-group">
                  <form onSubmit={handleSetStatus}>
                    <p>Counselor controls</p>
                    <select
                      class="form-select mt-2"
                      aria-label="Default select example"
                      id="status_select"
                    >
                      <option selected>Select status</option>
                      <option value="RESOLVED">Resolve</option>
                      <option value="CLOSED">Close</option>
                      <option value="IN_PROGRESS">In progress</option>
                    </select>
                    <button class="ml-2 btn btn-secondary btn-xs float-right mt-1 float-right">
                      Set status
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div class="row mt-1 col-md-12">
              <div class="form-group">
                <form onSubmit={handleSend}>
                  <label htmlFor="exampleFormControlTextarea1">
                    Write reply:
                  </label>
                  <textarea
                    class="form-control col-md-12"
                    id="reply_text"
                    rows="5"
                  ></textarea>
                  <button
                    type="submit"
                    class="btn btn-primary btn-sm float-right mt-1"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="container-fluid bg-white col-md-12 data-container rounded-bottom">
            <div class="row">
              <div class="col-md-12">
                <div class="headings d-flex justify-content-between align-items-end mb-3">
                  <h5>Replies </h5>
                </div>

                <div class="container-fluid">
                  <div class="row">
                    <TicketReplyList
                      ticketId={ticketId}
                      ticketReplies={ticketReplies}
                      setTicketReplies={setTicketReplies}
                      key="whatever"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketView;
