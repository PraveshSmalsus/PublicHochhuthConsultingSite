import React from "react";
import "../App.css";
import BannerSlider from "../components/BannerSlider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CareersContent from "../components/CareersContent";
import { HashLink } from "react-router-hash-link";
import SmartPageContainer from "../components/SmartPageContainer";

export default function Career() {

  return (
    <div id="wrapper" className="clearfix">
      <Navbar />
      <BannerSlider PageTitle={'Careers'} ContainerTitle={'Career Home'} id="careers" urlRoute = {"/careers#section-positions"}/>
      {/* <BannerSlider
        id="careers"
        heading="We look forward to meeting you!
        Let's grow together"
        subheading="As a fast-growing company, we are constantly looking for new talents to join our team. Opportunities to work with us are diverse, ranging from project-based work to full-time positions. We also welcome unsolicited applications from suitable applicants."
        btn={{
          text: "CHECK OPEN POSITIONS",
          urlRoute: "/careers#section-positions",
        }}
      /> */}
      <div id="page-menu" class="dots-menu dots-menu-border">
        <div id="page-menu-wrap">
          <div class="container">
            <div class="page-menu-row">
              <nav class="page-menu-nav">
                <ul class="page-menu-container one-page-menu" data-offset="0">
                  <li class="page-menu-item">
                    <HashLink to="" data-href="#header">
                      <div>CAREERS</div>
                    </HashLink>
                  </li>
                  <li class="page-menu-item">
                    <HashLink to="" data-href="#section-team">
                      <div>Our Team</div>
                    </HashLink>
                  </li>
                  <li class="page-menu-item">
                    <HashLink to="" data-href="#section-benefits">
                      <div>Benefits</div>
                    </HashLink>
                  </li>
                  <li class="page-menu-item">
                    <HashLink to="" data-href="#section-howwework">
                      <div>CORPORATE CULTURE</div>
                    </HashLink>
                  </li>
                  <li class="page-menu-item">
                    <HashLink to="" data-href="#section-positions">
                      <div>Positions</div>
                    </HashLink>
                  </li>
                </ul>
              </nav>

              <div id="page-menu-trigger">
                <i class="icon-reorder"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SmartPageContainer id="career" PageTitle={'Careers'} />
      <Footer />
    </div>
  );
}
