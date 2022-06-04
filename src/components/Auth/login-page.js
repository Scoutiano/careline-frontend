import React from "react";
import TopNav from "../top-nav";
import LoginForm from "./login-form";
import Footer from "../footer";

class LoginPage extends React.Component {
  render() {
    return (
      <div class="login-page-container">
        <TopNav />
        <LoginForm />
        <Footer />
      </div>
    );
  }
}

export default LoginPage;
