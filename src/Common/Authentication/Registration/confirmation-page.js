import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import HeaderLogin from "../Login/HederLogin/HeaderLogin";
import Footer from "../Footer/footer";

const ConfirmationPage = () => {
  const [token, setToken] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setToken(query.get("token"));
    if (token !== null) {
      sendToken();
    }

    console.log(token);
  }, [token]);

  const sendToken = () => {
    axios
      .get("/registration/confirm/" + token)
      .then((response) => {
        setIsConfirmed(true);
      })
      .catch((error) => {
        setIsConfirmed(false);
      });
  };

  if (token === null) {
    return <div></div>;
  }

  if (isConfirmed === false) {
    return (
      <div class="">
        <HeaderLogin />
        <div class="container data-container" id="login-form-container">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="col-md-12 d-flex align-items-center justify-content-center  bg-white">
                <div class="text-center">
                  <h1 class="display-1 fw-bold text-danger">
                    Confirmation failed!
                  </h1>
                  <p class="fs-3">
                    {" "}
                    <span class="text-dark">
                      Click button below to go back to login.
                    </span>
                    .
                  </p>
                  <a href="/login" class="btn btn-primary mb-10">
                    Go to login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  if (isConfirmed === true) {
    return (
      <div class="">
        <HeaderLogin />
        <div class="container data-container" id="login-form-container">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="col-md-12 d-flex align-items-center justify-content-center  bg-white">
                <div class="text-center">
                  <h1 class="display-1 fw-bold text-success">
                    Confirmation success!
                  </h1>
                  <p class="fs-3">
                    {" "}
                    <span class="text-dark">
                      Your account has been verified
                    </span>
                    .
                  </p>
                  <a href="/login" class="btn btn-primary mb-10">
                    Go to login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default ConfirmationPage;
