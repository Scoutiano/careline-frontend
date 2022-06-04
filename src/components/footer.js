import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div class="mt-5 pt-5 pb-5 footer " id="footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 col-xs-12 about-company">
              <h2 class="text-white">Careline BZU</h2>
              <p class="pr-5 text-white-50">
                This site was developped to help the counselors within the
                university of Birzeit to interact with students.{" "}
              </p>
              <p>
                <a href="#">
                  <i class="fa fa-facebook-square mr-1"></i>
                </a>
                <a href="#">
                  <i class="fa fa-linkedin-square"></i>
                </a>
              </p>
            </div>
            <div class="col-lg-3 col-xs-12 links">
              <h4 class="mt-lg-0 mt-sm-3 text-white">Links</h4>
              <ul class="m-0 p-0">
                <li>
                  - <a href="#">Home Page</a>
                </li>
                <li>
                  - <a href="#">Reserve a session</a>
                </li>
                <li>
                  - <a href="#">Contact counselors</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-4 col-xs-12 location">
              <h4 class="mt-lg-0 mt-sm-4 text-white-50">Birzeit University</h4>
              <p class="mb-0  text-white-50">
                <i class="fa fa-phone mr-3"></i>+970 568333992
              </p>
              <p class="text-white-50">
                <i class="fa fa-envelope-o mr-3"></i>
                carelineemailservices@gmail.com
              </p>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col copyright">
              <p class="">
                <small class="text-white-50">
                  © 2022. All Rights Reserved.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
