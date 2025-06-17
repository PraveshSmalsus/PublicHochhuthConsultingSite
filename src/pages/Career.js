import React from "react";
import "../App.css";
import { Helmet } from 'react-helmet'; // Import Helmet
import BannerSlider from "../components/BannerSlider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HashLink } from "react-router-hash-link";
import SmartPageContainer from "../components/SmartPageContainer";

export default function Career() {
  const PageTitle = "Careers at Hochhuth Consulting"; // Define the page title

  return (
    <div id="wrapper" className="clearfix">
      <Helmet>
        <title>{PageTitle} - Hochhuth Consulting</title>
        <meta name="description" content="Explore exciting career opportunities at Hochhuth Consulting. Join our team of experts in digital governance, project management, and business transformation." />
        <meta name="keywords" content="Hochhuth Consulting careers, job openings, digital transformation jobs, project management jobs, IT consulting careers, business consulting jobs" />
        <meta name="author" content="Hochhuth Consulting" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${PageTitle} - Hochhuth Consulting`} />
        <meta property="og:description" content="Looking for a career in digital transformation and consulting? Explore job opportunities at Hochhuth Consulting and grow with us." />
        <meta property="og:image" content="https://testing.hochhuth-consulting.de/path-to-careers-image.jpg" />
        <meta property="og:url" content="https://testing.hochhuth-consulting.de/careers" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hochhuth Consulting Careers" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${PageTitle} - Hochhuth Consulting`} />
        <meta name="twitter:description" content="We're hiring! Join Hochhuth Consulting and work with experts in digital governance, agile project management, and business transformation." />
        <meta name="twitter:image" content="https://testing.hochhuth-consulting.de/path-to-careers-image.jpg" />
        <link rel="canonical" href="https://testing.hochhuth-consulting.de/careers" />
      </Helmet>

      <Navbar />
      <BannerSlider PageTitle={'Careers'} ContainerTitle={'Career Home'} id="careers" urlRoute={"/careers#section-positions"} />
      <SmartPageContainer id="career" PageTitle={'Careers'} />
      <Footer />
    </div>
  );
}
