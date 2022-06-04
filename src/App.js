import React from "react";
import LoginPage from "./components/Auth/login-page";
import Footer from "./components/footer";
import TopNav from "./components/top-nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/Auth/login-form";
import RegistrationForm from "./components/Auth/registration-form";
import TicketList from "./components/Ticket/ticket-list";
import TicketPage from "./components/Ticket/ticket-page";
import LogOut from "./components/Auth/log-out";
import axios from "axios";

const App = () => {
  return (
    <Router>
      <div className="App" id="app">
        <div class="wrapper">
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/logout">
              <LogOut />
            </Route>
            <Route path="/register">
              <RegistrationForm />
            </Route>
            <Route path="/tickets">
              <TicketPage />
            </Route>
            <Route path="/home">
              <div></div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
