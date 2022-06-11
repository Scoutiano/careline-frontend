import React from "react";
import axios from "axios";
import { TicketReplyCard } from "./ticket-reply-card";
import { useState } from "react";
import { useEffect } from "react";

export const TicketReplyList = ({
  ticketReplies,
  ticketId,
  setTicketReplies,
}) => {
  useEffect(() => {}, []);

  return (
    <div class="col-md-12">
      {ticketReplies.map((ticketReply) => (
        <TicketReplyCard
          key={ticketReply.id}
          user={ticketReply.user}
          content={ticketReply.content}
          creationDate={ticketReply.creationDate}
        />
      ))}
    </div>
  );
};
