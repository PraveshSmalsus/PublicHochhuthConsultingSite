import React, { useState, useEffect } from "react";
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from 'react-router-dom';  // Import the useLocation hook

let smartMetaDataItem = []
let allData = []

export default function SmartPage() {
  const [smartPageContent, setSmartPageContent] = useState({});
  const location = useLocation();  
  const pathname = location.pathname;
  // The last segment will be the last part of the URL path
  const lastName = pathname.startsWith('/') ? pathname.slice(1) : pathname;

  console.log(lastName); // "lastName"

  function formatTitle(text) {
    return text.replace(/-/g, ' ');
  }
  useEffect(() => {
    const GetAllSmartMetaData = async (tableName) => {
      const smartdata = await getPublicServerData(tableName);
      smartMetaDataItem = await Promise.all(
        smartdata.map(async (item) => {
          item.SectionPart = [];
          item.PageContainers = await CommonFunctions.parseJson(item.PageContainers);
          if (item.Title.toLowerCase().replace(/\s+/g, '') === lastName.toLowerCase().replace(/\s+/g, '')) {
            return item;  // Return the item if it matches
          }
          if(item?.Title?.toLowerCase() == formatTitle(lastName?.toLowerCase())){
            return item;
          }
          // return null;  // Return null if it doesn't match
        })
      );
      allData = smartMetaDataItem.filter(item => item != null && item != undefined);
      setSmartPageContent(allData[0]);
      console.log(smartMetaDataItem);
    };

    GetAllSmartMetaData('SmartMetaData');
  }, [location.pathname]);  // Depend on location.pathname to re-run the effect when the route changes

  return (
    <div id="wrapper" className="clearfix">
      <section id="content" className="pt-4">
        <div className="content-wrap">
          <section className="page-section mt-0 section bg-transparent pt-0">
            <div className="container clearfix">
              <div className="heading-block fancy-title border-bottom-0 title-bottom-border bottommargin-sm">
                <h4>
                  <strong>{smartPageContent.Title}</strong>
                </h4>
              </div>
              <div dangerouslySetInnerHTML={{ __html: smartPageContent.PageContent }} />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
