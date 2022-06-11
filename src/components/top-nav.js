import React from "react";
import UserProfile from "./Auth/UserProfile";

const TopNav = () => {
  return (
    <nav class="navbar navbar-inverse navbar-expand-lg navbar-expand-md navbar-expand-sm">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            Careline
          </a>
        </div>
        <ul class="nav navbar-nav">
          <li class="active">
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/tickets">Ticket board</a>
          </li>
          <li>
            <a href="#">Session Requests</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          {UserProfile.getRole() === null ? (
            <li>
              <a href="/register">
                <span class="glyphicon glyphicon-user"></span> Sign Up
              </a>
            </li>
          ) : (
            <li></li>
          )}
          {UserProfile.getRole() === null ? (
            <li>
              <a href="/login">
                <span class="glyphicon glyphicon-log-in"></span> Login
              </a>
            </li>
          ) : (
            <li>
              <a href="/logout">
                <span class="glyphicon glyphicon-log-in"></span> Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopNav;
