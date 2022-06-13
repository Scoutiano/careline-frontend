import React from "react";
import TopNav from "../../../Student/Navigation/TopNav/TopNav";
import NavBar from "../../Navigation/NavBar";
import Footer from "../Footer/footer";
import HeaderLogin from "./HederLogin/HeaderLogin";
import LoginForm from "./login-form";

// class LoginPage extends React.Component {
const LoginPage = () => {
  return (
    <div class="login-page-container">
      {/* <HeaderLogin /> */}
      <TopNav />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default LoginPage;
