import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TicketList from "./ticket-list";
import Pagination from "./pagination";
import TicketSearch from "./ticket-search";
import TopNav from "../top-nav";
import { Redirect } from "react-router-dom";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import UserProfile from "../Auth/UserProfile";
import Footer from "../footer";
import TicketView from "./ticket-view";

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    setLoading(true);
    isAuthenticated();
    fetchData();
    setLoading(false);
  }, []);

  const isAuthenticated = () => {
    if (UserProfile.getRole() !== "COUNSELOR") {
      setRedirect("/home");
      if (UserProfile.getRole() === "") {
        setRedirect("/login");
      }
    }
  };

  const fetchData = async () => {
    const { data } = await axios.get("/ticket").catch(function (error) {
      if (error.status === 401) {
        setRedirect("/logout");
      }
    });
    setTickets(data);
    setFilteredTickets(data);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filterTickets = (newTickets) => {
    setFilteredTickets([...newTickets]);
  };

  const lastPost = currentPage * ticketPerPage;
  const firstPost = lastPost - ticketPerPage;
  const currentTickets = filteredTickets.slice(firstPost, lastPost);

  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }
  return (
    <div class="ticket-page-container">
      <TopNav />
      <div class="container-fluid mt-100" id="ticket-list">
        <TicketSearch tickets={tickets} filterTickets={filterTickets} />
        <Pagination
          postsPerPage={ticketPerPage}
          totalPosts={filteredTickets.length}
          paginate={paginate}
        />
        <TicketList tickets={currentTickets} loading={loading} />
        <Pagination
          postsPerPage={ticketPerPage}
          totalPosts={filteredTickets.length}
          paginate={paginate}
        />
      </div>
      <Footer />
      <TicketView />
    </div>
  );
};

export default TicketPage;
