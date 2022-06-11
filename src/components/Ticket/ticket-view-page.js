import React from "react";
import axios from "axios";
import Footer from "../footer";
import TopNav from "../top-nav";
import TicketView from "./ticket-view";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { NotFound } from "./not-found";

export const TicketViewPage = () => {
  const [ticketId, setTicketId] = useState(null);
  const [redirect, setRedirect] = useState(null);
  useEffect(() => {
    retrieveTicketId();
  }, [ticketId]);

  const location = useLocation();

  const retrieveTicketId = () => {
    const query = new URLSearchParams(location.search);
    setTicketId(query.get("id"));
  };

  return (
    <div>
      <TopNav />
      <div class="d-flex justify-content-center">
        {ticketId === null ? <NotFound /> : <TicketView ticketId={ticketId} />}
      </div>
      <Footer />
    </div>
  );
};
