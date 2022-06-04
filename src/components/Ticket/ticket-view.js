import React from "react";
import TicketCard from "./ticket-card";
import { TicketReply } from "./ticket-reply";

export const TicketView = ({}) => {
  return (
    <div class="">
      <TicketCard />
      <div class="bg-white col-md-12" id="ticket-view-container">
        <div class="row">
          <div class="col-sm-5 col-md-6 col-12 pb-4">
            <h1>Replies</h1>
            <TicketReply />
          </div>
          <div class="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
            <form id="algin-form">
              <div class="form-group">
                <h4>Leave a reply.</h4>
                <label for="message">Message</label>
                <textarea
                  name="msg"
                  id=""
                  msg
                  cols="30"
                  rows="5"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="fullname"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                {/* <p class="text-secondary">
                  If you have a{" "}
                  <a href="#" class="alert-link">
                    gravatar account
                  </a>{" "}
                  your address will be used to display your profile picture.
                </p> */}
              </div>
              <div class="form-inline">
                <input type="checkbox" name="check" id="checkbx" class="mr-1" />
                <label for="subscribe">Subscribe me to the newlettter</label>
              </div>
              <div class="form-group">
                <button type="button" id="post" class="btn">
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
