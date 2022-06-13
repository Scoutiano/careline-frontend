import React from "react";
import axios from "axios";
import TicketView from "./TicketView";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import TopNav from "../../../Student/Navigation/TopNav/TopNav";
import { NotFound } from "../../PageNotFound/not-found";
import Footer from "../../Authentication/Footer/footer";

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
