import React from "react";
import "../App.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReadMoreBanner from "../components/ReadMoreBanner";
export default function TaskManagerDigital() {
  return (
    <div id="wrapper" className="clearfix">
      <Navbar />
      <ReadMoreBanner
        heading="Task Manager Digital Governance (Product Owner; QA; Solution Architect)"
        subheading="Hochhuth Consulting GmbH is an international consulting firm headquartered in Berlin. The company advises international and public organizations as well as private sector actors on how to better shape development cooperation with the help of innovative digital solutions.  The focus of our work is on building smart knowledge management, team management and project management structures. Our goal is to provide user-friendly and innovative digital processes for international cooperation that enable our clients to coordinate processes and projects more efficiently, and to contribute to sustainability and poverty reduction with the help of digital solutions."
      />
      
      <section id="content">
        <div class="content-wrap">
          <section class="page-section mt-0 section bg-transparent pt-0">
            <div class="container clearfix">
              <div
                class="vacancydetail-desc"
                ng-bind-html="Vacancies[0].Description | trustedHTML"
              >
                <div class="ExternalClass7030A43113E14C2590231703696A4B1B">
                  <h4>
                    <strong>Your Role</strong>
                  </h4>
                  <p>
                    You will be part of a dynamic international team and support
                    us in the implementation and coordination of projects. In
                    close coordination with the management team and the
                    customers, you will support the implementation of projects
                    through versatile and multidisciplinary collaboration in the
                    following areas:
                  </p>
                  <ul>
                    <li>Task and Portfolio Management </li>
                    <li>Maintenance and Quality Control</li>
                    <li>Information and Knowledge Management</li>
                    <li>
                      Unterstützung und Erweiterung von Firmen-internen
                      Prozessen
                    </li>
                  </ul>
                  <p>
                    In executing your responsibilities, you will support the
                    company in the following roles:
                  </p>
                  <ul>
                    <li>
                      Management of Hochhuth-Consulting GmbH's Task Portfolio{" "}
                    </li>
                    <li>
                      Support and enhancement of internal company processes,
                      especially in building up solution architecture database{" "}
                    </li>
                  </ul>
                  <br />
                  <p>
                    Hochhuth Consulting uses an agile task management tool to
                    distribute tasks and assignments. Through this, all jobs and
                    the resulting tasks, whether from customers or internally,
                    are collected and prioritized. Tasks are distributed
                    according to expertise, interest, challenge and
                    availability. The task management allows for work to be done
                    flexibly in the office, in the home office or in the most
                    beautiful places in the world.
                  </p>
                  <br />
                  <h4>
                    <strong>Your Profile</strong>
                  </h4>
                  <p>
                    With more than 50 team members, Hochhuth Consulting is
                    already very strongly positioned in the technical
                    development and is therefore looking for reinforcement of
                    its client-facing governance team. We are looking for
                    motivated team members who, in addition to enthusiasm for
                    meaningful work, have the following qualifications:{" "}
                  </p>
                  <br />
                  <ul>
                    <li>
                      At least 2-3 years of professional experience in task/
                      product management
                    </li>
                    <li>
                      Experience in public administration, business development
                      or change management a plus
                    </li>
                    <li>
                      Interest and knowledge in topics related to social impact,
                      development cooperation, sustainability or other social
                      purposes. Hands-on experience is a plus.{" "}
                    </li>
                    <li>
                      You are computer savvy and have previous experience
                      working with IT.
                    </li>
                    <li>
                      Strong experience working with web design, Excel or
                      SharePoint is desirable. Our digital services are based on
                      SharePoint solutions, so previous experience in these
                      aspects is welcome to be emphasized.{" "}
                    </li>
                    <li>
                      Very good organizational skills, eager to learn,
                      self-starter and initiative to name problems and find
                      solutions.{" "}
                    </li>
                    <li>
                      Communicative and with the ability to think dynamically{" "}
                    </li>
                    <li>
                      Business fluent in English. Other languages (especially
                      German, French or Spanish) are an advantage
                    </li>
                  </ul>
                  <br />
                  <h4>
                    <strong>Our Offer</strong>
                  </h4>
                  <ul>
                    <li>Meaningful, challenging work.</li>
                    <li>A competitive compensation package.</li>
                    <li>
                      Working flexible hours is possible due to our agile
                      organizational management approach.
                    </li>
                    <li>
                      Working from home with room to shape processes and work
                      independently.
                    </li>
                    <li>
                      Committed and motivating colleagues in an organization
                      with flat hierarchies and professional management{" "}
                    </li>
                    <li>A start-up atmosphere </li>
                  </ul>
                  <h4>
                    <strong>Start</strong>
                  </h4>
                  <p>Immediately</p>
                  <br />
                  <h4>
                    <strong>Your Application</strong>
                  </h4>
                  <p>
                    We are looking forward to your short letter of motivation
                    describing your interest in working at the intersection of
                    social engagement and professional digital services and what
                    knowledge you could bring to the table in the area of
                    digital applications (e.g. SharePoint) or change management.
                  </p>
                  <p>
                    Please send us your CV, motivation letter and indication of
                    your salary expectations via email addressed to Stefan
                    Hochhuth:{" "}
                    <a
                      target="_blank"
                      href="mailto:recruiting@hochhuth-consulting.de"
                      rel="noreferrer"
                    >
                      recruiting@hochhuth-consulting.de
                    </a>
                  </p>
                  <p>
                    If you have any questions, do not hesitate to contact us at{" "}
                    <a
                      target="_blank"
                      href="mailto:recruiting@hochhuth-consulting.de"
                      rel="noreferrer"
                    >
                      recruiting@hochhuth-consulting.de
                    </a>{" "}
                    or via <a href="tel:+4930-870-6600">+49 (30) 868706600</a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}
