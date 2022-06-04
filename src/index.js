import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.js";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://careline-bzu.herokuapp.com";
// axios.defaults.baseURL = "http://localhost:8080";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
