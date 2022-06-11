import React from "react";
import LoginPage from "./components/Auth/login-page";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TicketPage from "./components/Ticket/ticket-page";
import LogOut from "./components/Auth/log-out";
import RegistrationPage from "./components/Auth/registeration-page";
import { TicketViewPage } from "./components/Ticket/ticket-view-page";
import { Home } from "./components/home";
import ConfirmationPage from "./components/Auth/confirmation-page";
import Dashboard from "./components/CounselorUI/Dashboard";
import TicketForm from "./components/Ticket/TicketFormPage/TicketForm";

const App = () => {
  return (
    <Router>
      <div className="App" id="app">
        <Switch>
          <div class="wrapper">
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/home" exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/logout" exact>
              <LogOut />
            </Route>
            <Route path="/register" exact>
              <RegistrationPage />
            </Route>
            <Route path="/tickets" exact>
              <TicketPage />
            </Route>
            <Route path="/ticket" exact>
              <TicketViewPage />
            </Route>
            <Route path="/register/confirm" exact>
              <ConfirmationPage />
            </Route>
            <Route path="/test" exact>
              <TicketForm />
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
