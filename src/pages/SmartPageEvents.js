import React, { useState, useEffect } from "react";
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from 'react-router-dom';  // Import the useLocation hook

let smartMetaDataItem = []
let allData = []

export default function SmartPageEvents() {
  const [smartPageContent, setSmartPageContent] = useState({});
  const location = useLocation();  
  const pathname = location.pathname;
  // The last segment will be the last part of the URL path
  const lastName = pathname.split('SmartPage/')[1]

  console.log(lastName); // "lastName"

  // Function to decode URL string
  function decodeURLString(encodedString) {
    // return decodeURIComponent(encodedString);
    const decoded = decodeURIComponent(encodedString);
    return decoded.replace(/-/g, ' ');
  }

  useEffect(() => {
    const GetAllSmartMetaData = async (tableName) => {
      const smartdata = await getPublicServerData(tableName);
      smartMetaDataItem = await Promise.all(
        smartdata.map(async (item) => {
          if (item.Title.toLowerCase() === decodeURLString(lastName).toLowerCase()) {
            return item;  // Return the item if it matches
          }
          return null;  // Return null if it doesn't match
        })
      );
      allData = smartMetaDataItem.filter(item => item !== null);
      setSmartPageContent(allData[0]);
      console.log(smartMetaDataItem);
    };

    GetAllSmartMetaData('Events');
  }, [location.pathname]);  // Depend on location.pathname to re-run the effect when the route changes

  return (
    <div id="wrapper" className="clearfix">
      <Navbar />
      <section id="main-content" className="main-content">
      <div className="inner-wrapper">
        <section className="title-section">
          <div className="wrapper">
            <div className="title-container">
              <h1 className="section-title">{smartPageContent?.Title}</h1>
            </div>
            <div className="description-text">{smartPageContent?.SubHeading}</div>
          </div>
        </section>
      </div>
    </section>
      <section id="content" className="pt-4">
        <div className="content-wrap">
          <section className="page-section mt-0 section bg-transparent pt-0">
            <div className="container clearfix">
              <div dangerouslySetInnerHTML={{ __html: smartPageContent?.Description }} />
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}
