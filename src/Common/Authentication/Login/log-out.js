import React from "react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import UserProfile from "../UserProfile";

const LogOut = () => {
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    logOut();
  }, []);

  const logOut = () => {
    axios.get("/logout");
    UserProfile.clear();
    setRedirect("/login");
  };

  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }
};

export default LogOut;
