import React from "react";
import { useHistory } from "react-router-dom";

function TicketCard(props) {
  const history = useHistory();

  function openTicketView() {
    history.push(`/ticket?id=` + props.id, {
      id: props.id,
      title: props.title,
      content: props.content,
      status: props.status,
      priority: props.priority,
      creationDate: props.creationDate,
    });
  }

  function renderPriority(param) {
    switch (param) {
      case "URGENT":
        return " bg-danger text-white";
      case "INTERMEDIATE":
        return " bg-warning text-black";
      case "NORMAL":
        return " bg-success text-black";
      default:
        return "";
    }
  }

  function renderStatus(param) {
    <div class="status bg-success text-white">
      <p>RESOLVED</p>
    </div>;
    switch (param) {
      case "RESOLVED":
        return (
          <div class="status bg-primary text-white">
            <p>RESOLVED</p>
          </div>
        );
      case "PENDING":
        return (
          <div class="status bg-secondary text-white">
            <p>PENDING</p>
          </div>
        );
      case "IN_PROGRESS":
        return (
          <div class="status bg-info text-white">
            <p>IN PROGRESS</p>
          </div>
        );
      case "CLOSED":
        return (
          <div class="status bg-danger text-white">
            <p>CLOSED</p>
          </div>
        );
      default:
        return "";
    }
  }

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

  return (
    <div class="col-md-12 ticket-card">
      <div class="card mb-3" onClick={() => openTicketView()}>
        <div class="card-body">
          <div class="ticket-content">
            <div class="title-status">
              <p class="card-title">{props.title} </p>{" "}
              {renderStatus(props.status)}{" "}
            </div>
            <p class="card-text">{props.content}</p>
            <p class="card-text">
              <small class="text-muted">
                Created at {formatDate(props.creationDate)}
              </small>
            </p>
          </div>
          <div class={"ticket-action" + renderPriority(props.priority)}>
            <div class="priority">
              <p>{props.priority}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
