import React from "react";
import TicketCard from "./ticket-card";

function TicketList({ tickets, loading }) {
  return (
    <div class="row">
      {tickets.map((ticket) => (
        <TicketCard
          title={ticket.title}
          content={ticket.content}
          priority={ticket.priority}
          creationDate={ticket.creationDate}
          key={ticket.id}
          status={ticket.status}
        />
      ))}
    </div>
  );
}

export default TicketList;
