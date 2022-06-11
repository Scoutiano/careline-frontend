import React from "react";
import TopNav from "../top-nav";
import LoginForm from "./login-form";
import Footer from "../footer";
import RegistrationForm from "./registration-form";

class RegistrationPage extends React.Component {
  render() {
    return (
      <div id="registration-page-container">
        <TopNav />
        <RegistrationForm />
        <Footer />
      </div>
    );
  }
}

export default RegistrationPage;
