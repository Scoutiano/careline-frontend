import React from "react";
import { useState, useEffect } from "react";

function TicketSearch({ tickets, filterTickets }) {
  const [] = useState([]);

  useEffect(() => {}, []);

  var filteredTickets;

  function filter(e) {
    let isChecked = document.getElementById("filterResolved").checked;
    let title = document
      .getElementById("searchTitle")
      .value.trim()
      .toLowerCase();

    if (isChecked === true) {
      filteredTickets = tickets.filter((ticket) => {
        return (
          ticket.status !== "RESOLVED" &&
          ticket.status !== "CLOSED" &&
          ticket.title.toLowerCase().includes(title)
        );
      });
    } else {
      filteredTickets = tickets.filter((ticket) => {
        return ticket.title.toLowerCase().includes(title);
      });
    }

    filterTickets(filteredTickets);

    // let title = e.target.value.trim().toLowerCase();
    // filteredTickets = tickets.filter((ticket) => {
    //     return ticket.title.toLowerCase().includes(title);
    // })

    // filterTickets(filteredTickets);
  }

  function search(e) {}

  const [searchTitle, setSearchTitle] = useState();
  const [notResolved] = useState(false);

  return (
    <div class="container-fluid mt-100" id="ticket-search">
      <div class="row">
        <div class="title-search">
          <label>Search: </label>
          <input
            type="text"
            onChange={filter}
            id="searchTitle"
            placeholder="title"
          />
        </div>
        <div class="check-filter">
          <input
            class="form-check-input"
            type="checkbox"
            onChange={filter}
            id="filterResolved"
          />
          <label classs="form-check-label">Hide done tickets.</label>
        </div>
      </div>
    </div>
  );
}

export default TicketSearch;
