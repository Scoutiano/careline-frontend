import React from "react";
import counselor from "../../images/counselor.png";
import student from "../../images/student.png";
export const TicketReplyCard = ({ content, creationDate, user }) => {
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
    <div class="card p-3 mt-2 mb-5">
      <img
        src={user.userRole === "COUNSELOR" ? counselor : student}
        width="40"
        class="user-img rounded-circle mr-4"
        alt=""
      />
      <p>{user.username}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="user d-flex flex-row align-items-center">
          <span>
            <p>{content}</p>
          </span>
        </div>

        <span></span>
      </div>

      <div class="action d-flex justify-content-between mt-2 align-items-center">
        <div class="reply px-4">
          <small>Reply at {formatDate(creationDate)}</small>
        </div>

        <div class="icons align-items-center">
          <i class="fa fa-check-circle-o check-icon text-primary"></i>
        </div>
      </div>
    </div>
  );
};
