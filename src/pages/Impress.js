import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Impress() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("https://argosmob.uk/api-random/getImpressData.php")
      .then((response) => {
        if (response?.data?.success) {
          setContent(response?.data?.data?.Description);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching the navigation data:", error);
      });
  }, []);
  return (
    <div id="wrapper" className="clearfix">
      <Navbar />
      <section id="content">
        <div className="content-wrap">
          <section className="page-section mt-0 section bg-transparent pt-0">
            <div className="container clearfix">  
              <div className="heading-block fancy-title border-bottom-0 title-bottom-border bottommargin-sm">
                <h4>
                  <strong>Impress</strong>
                </h4>
              </div>
              <div dangerouslySetInnerHTML={{ __html: content }} />
              {/* {content?.Description} */}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}
