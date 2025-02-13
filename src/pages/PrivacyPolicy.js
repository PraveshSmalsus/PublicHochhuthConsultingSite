import React from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrivacyAndPolicy from '../components/PrivacyAndPolicy';
export default function PrivacyPolicy() {
  
  return (
    <div id="wrapper" className="clearfix">
      <Navbar />
       <PrivacyAndPolicy/>
      <Footer />
    </div>
  )
}
