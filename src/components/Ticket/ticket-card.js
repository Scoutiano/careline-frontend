import React from "react";

class TicketCard extends React.Component {
  renderPriority(param) {
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

  renderStatus(param) {
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

  formatDate(creationDate) {
    var date = new Date(creationDate);
    var hours = date.getHours();
    var AMorPM = "AM";
    if (date.getHours() > 12) {
      hours = date.getHours() - 12;
      AMorPM = "PM";
    }
    var time = hours + ":" + date.getMinutes() + " " + AMorPM;
    var res =
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      date.getDay() +
      " " +
      time;

    return res;
  }

  openTicketView() {}

  render() {
    return (
      <div
        class="col-md-12 ticket-card"
        onClick={"location.href = '/tickets/" + this.props.key + "';"}
      >
        <div class="card mb-3">
          <div class="card-body">
            <div class="ticket-content">
              <div class="title-status">
                <p class="card-title">{this.props.title} </p>{" "}
                {this.renderStatus(this.props.status)}{" "}
              </div>
              <p class="card-text">{this.props.content}</p>
              <p class="card-text">
                <small class="text-muted">
                  Created at {this.formatDate(this.props.creationDate)}
                </small>
              </p>
            </div>
            <div
              class={"ticket-action" + this.renderPriority(this.props.priority)}
            >
              <div class="priority">
                <p>{this.props.priority}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketCard;
