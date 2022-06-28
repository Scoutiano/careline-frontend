import React from "react";
import Footer from "../Footer/footer";
import HeaderLogin from "./HederLogin/HeaderLogin";
import LoginForm from "./login-form";

// class LoginPage extends React.Component {
const LoginPage = () => {
  return (
    <div class="login-page-container">
      <HeaderLogin />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
