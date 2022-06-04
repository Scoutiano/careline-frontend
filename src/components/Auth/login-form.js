import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UserProfile from "../Auth/UserProfile";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
      redirect: "",
      user: "",
    };
    this.handleLogin = this.handleLogin.bind(this);

    if (UserProfile.getRole() !== null) {
      this.state.redirect = "/home";
    }
  }

  async handleLogin(e) {
    // axios.interceptors.request.use((x) => {
    //   console.log(x);
    // });
    e.preventDefault();
    // const { data } = await axios.get("/user/current");
    const loginInfo = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    var hasError = false;
    var toRedirect = "";
    await axios({
      method: "post",
      url: "/login",
      data: loginInfo,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(async function (response) {
        console.log(response);
        const { data } = await axios.get("/user/current");

        console.log("Response: ", response);
        UserProfile.setEmail(data.email);
        UserProfile.setUsername(data.username);
        UserProfile.setRole(data.role);
        UserProfile.setId(data.id);

        toRedirect = "/home";
      })
      .catch(function (error) {
        console.log("Error: ", error);
        if (error.response.status === 401) {
          hasError = true;
        }
      });

    this.setState({ redirect: toRedirect });
    if (hasError) {
      this.setState({
        errorMsg: "Invalid login information, please try again.",
      });
    }
  }

  render() {
    if (this.state.redirect === "/home") {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div class="container" id="login-form-container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="card shadow-lg border-0 rounded-lg mt-5">
              <div class="card-header">
                <h3 class="text-center font-weight-light my-4">Login</h3>
              </div>
              <div class="card-body"></div>
              <form onSubmit={this.handleLogin} class="mt-5 ml-5 mr-5">
                <div class="form-outline mb-4">
                  <input type="email" id="username" class="form-control" />
                  <label class="form-label" htmlFor="username">
                    Email address
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="password" class="form-control" />
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
                  Sign in
                </button>

                <div class="text-center">
                  <p>
                    Not a member? <a href="/register">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
