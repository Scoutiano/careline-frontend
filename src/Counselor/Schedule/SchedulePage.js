import React from "react";
import Schedule from "./Schedule";
import axios from "axios";
import { useState, useEffect } from "react";
import UserProfile from "../../Common/Authentication/UserProfile";
import { Redirect } from "react-router-dom";

export const SchedulePage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    isAuthenticated();
    fetchData();
    setLoading(false);
  }, []);

  const isAuthenticated = () => {
    if (UserProfile.getRole() !== "COUNSELOR") {
      setRedirect("/home");
    }
  };

  const fetchData = async () => {
    const { data } = await axios.get("/session").catch(function (error) {
      if (error.status === 401) {
        setRedirect("/logout");
      }
    });
    setDataSource(data);
  };

  if (redirect !== null) {
    <Redirect to={redirect} />;
  }
  if (loading === true) {
    return <div></div>;
  }
  return <Schedule dataSource={dataSource} />;
};
