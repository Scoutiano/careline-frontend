import React from "react";
import UserProfile from "./Auth/UserProfile";

class TopNav extends React.Component {
  render() {
    return (
      <div class="navbar-container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">
            Careline
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Reserve Session
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Contact Counselors
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  {UserProfile.getRole() !== null ? (
                    <a class="dropdown-item" href="/logout">
                      Logout
                    </a>
                  ) : (
                    <a class="dropdown-item" href="/login">
                      Login
                    </a>
                  )}
                  <a class="dropdown-item" href="google.com"></a>
                  <a class="dropdown-item" href="google.com"></a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="google.com">
                    Something else here
                  </a>
                </div>
              </li>
              <form class="form-inline my-2 my-lg-0">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  class="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default TopNav;
