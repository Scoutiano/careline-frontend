import React from "react";
import Footer from "../Footer/footer";
import HeaderLogin from "../Login/HederLogin/HeaderLogin";
import RegistrationForm from "./registration-form";

class RegistrationPage extends React.Component {
  render() {
    return (
      <div id="registration-page-container">
        <HeaderLogin />
        <RegistrationForm />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default RegistrationPage;
