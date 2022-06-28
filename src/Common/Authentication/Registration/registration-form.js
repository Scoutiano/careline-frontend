import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
      redirect: null,
    };
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  async handleRegistration(e) {
    e.preventDefault();
    const registrationInfo = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    var msg = "";
    var hasError = false;
    var redir = null;
    await axios({
      method: "post",
      url: "/registration",
      data: registrationInfo,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        alert("Confirmation email sent! Please check your account.");
        redir = "/login";
      })
      .catch(function (error) {
        if (error.response.status === 500) {
          msg = error.response.data;
          hasError = true;
        }
      });

    if (hasError) {
      this.setState({ errorMsg: msg });
    }

    this.setState({ redirect: redir });
  }

  render() {
    if (this.state.redirect !== null) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div class="container data-container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="card shadow-lg border-0 rounded-lg mt-5">
              <div class="card-header">
                <h3 class="text-center font-weight-light my-4">Register</h3>
              </div>
              <div class="card-body"></div>
              <form onSubmit={this.handleRegistration} class="mt-5 ml-5 mr-5">
                <div class="form-outline mb-4">
                  <input type="text" id="username" class="form-control" />
                  <label class="form-label" htmlFor="username">
                    Username
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    class="form-control"
                    placeholder="studentid@student.birzeit.edu"
                  />
                  <label class="form-label" htmlFor="email">
                    Email address
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    minLength={6}
                    placeholder="At least 6 characters"
                  />
                  <label class="form-label" htmlFor="password" name="password">
                    Password
                  </label>
                </div>

                <div class="row mb-4">
                  <div class="col d-flex justify-content-center"></div>
                  <div class="col"></div>
                </div>

                <p id="login-error">{this.state.errorMsg}</p>

                <button type="submit" class="btn btn-primary btn-block mb-4">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
