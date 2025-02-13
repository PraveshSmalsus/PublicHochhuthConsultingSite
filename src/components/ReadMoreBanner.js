import React from "react";
import { HashLink } from "react-router-hash-link";

export default function ReadMoreBanner({heading,subheading}) {
  return (
    <section
      id="page-title"
      class="page-title-parallax page-title-dark skrollable skrollable-between"
      data-bottom-top="background-position:0px 300px;"
      data-top-bottom="background-position:0px -300px;"
    >
      <div class="container text-center clearfix ng-scope">
        <div class="back">
          <HashLink to="/careers#section-positions">
            <i class="icon-line-arrow-left"></i> <span>Back to vacancies</span>
          </HashLink>
        </div>
        <div class="col-lg-10 mx-auto">
          <h1 class="nott mb-3">
           {heading}
          </h1>
          <span>
            {subheading}
          </span>
        </div>
      </div>
    </section>
  );
}
