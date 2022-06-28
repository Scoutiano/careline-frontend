import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div class="mt-5 pt-5 pb-5 footer " id="footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 col-xs-12 about-company">
              <h5 class="text-white">Careline BZU</h5>
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
              {/* <h4 class="mt-lg-0 mt-sm-3 text-white">Links</h4> */}
              {/* <ul class="m-0 p-0">
                <li>
                  - <a href="#">Home Page</a>
                </li>
                <li>
                  - <a href="#">Reserve a session</a>
                </li>
                <li>
                  - <a href="#">Contact counselors</a>
                </li>
              </ul> */}
            </div>
            <div >
              <h4 >Birzeit University</h4>
              <p >
                <i class="fa fa-phone mr-3"></i>+970 568333992
              </p>
              <p >
                {/* <i class="fa fa-envelope-o mr-3"></i> */}
                carelineemailservices@gmail.com
              </p>
            </div>
          </div>
          <div >
            <div >
              <p class="">
                <small >
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
