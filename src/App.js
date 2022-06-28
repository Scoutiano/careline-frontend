import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./Common/Authentication/Login/LoginPage";
import LogOut from "./Common/Authentication/Login/log-out";
import RegistrationPage from "./Common/Authentication/Registration/registeration-page";
import TicketPage from "./Common/Ticket/TicketPage/TicketPage";
import ConfirmationPage from "./Common/Authentication/Registration/confirmation-page";
import TicketForm from "./Common/Ticket/TicketFormPage/TicketForm";
import { TicketViewPage } from "./Common/Ticket/TicketViewPage/TicketViewPage";
import { Home } from "./Common/Home/Home";
import { SchedulePage } from "./Common/Schedule/SchedulePage";
import MoreInfoPage from "./Common/Announcements/MoreInfo";
import AddEvent from "./Common/Announcements/AddEvent";

const App = () => {
  return (
    <>
      <Router>
        {/* <SideBar /> */}
        <div className="App" id="app">
          <Switch>
            <div class="wrapper">
              <Route path="/" exact>
                <LoginPage />
              </Route>
              <Route path="/login" exact>
                <LoginPage />
              </Route>
              <Route path="/home" exact>
                <Home />
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
              <Route path="/sendTicket" exact>
                <TicketForm />
              </Route>
              <Route path="/schedule" exact>
                <SchedulePage />
              </Route>
              <Route path="/moreInfo" exact>
                <MoreInfoPage />
              </Route>
              <Route path="/addevent" exact>
                <AddEvent />
              </Route>
            </div>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
