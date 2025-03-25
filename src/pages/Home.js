import React, { useEffect, useState } from 'react';
import "../App.css";
import BannerSlider from "../components/BannerSlider";
import Navbar from "../components/Navbar";
import PageSubMenu from "../components/PageSubMenu";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
import * as CommonFunctions from '../Service/CommonFunctions';
import { getPublicServerData } from '../Service/GetDataApi';
import SmartPage from './SmartPage';
import SmartPageContainer from "../components/SmartPageContainer";

let pageFlag;
export default function Home(props) {
  const PageTitle = props.Title;

  // State variables to store fetched data
  const [smartPageData, setSmartPageData] = useState([]);
  const [backgroundImageHeader, setBackgroundImageHeader] = useState(null);
  const [containerListData, setContainerListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [containerNottag, setcontainerNottagg] = useState(false);

  useEffect(() => {
    // Start fetching data on component mount
    async function fetchData() {
      const smartData = await GetAllSmartMetaData('SmartMetaData');
      const containers = await GetAllContainerListData('ContainerList');

      // Process and combine data
      const backgroundImage = GetBackgroundImage(smartData, containers);

      setSmartPageData(smartData);
      setContainerListData(containers);
      setBackgroundImageHeader(backgroundImage);
      setLoading(false);
    }

    fetchData();
  }, [PageTitle]);

  // Function to decode URL string
  function decodeURLString(encodedString) {
    return decodeURIComponent(encodedString);
  }

  // Fetch smart meta data and filter by title
  const GetAllSmartMetaData = async (tableName) => {
    setcontainerNottagg(false)
    pageFlag = false;
    const smartdata = await getPublicServerData(tableName);
    const updatedSmartData = await Promise.all(
      smartdata.map(async (item) => {
        item.PageContainers = await CommonFunctions.parseJson(item.PageContainers);
        if (item.Title.toLowerCase() === decodeURLString(PageTitle).toLowerCase()) {
          if (item.PageContainers != undefined && item.PageContainers.length > 0) {
            //setcontainerNottagg(true)
            pageFlag = true;
          }
          return item;
        }
        return null;
      })
    );
    return updatedSmartData.filter(item => item !== null);
  };

  // Fetch container list data
  const GetAllContainerListData = async (tableName) => {
    const containerdata = await getPublicServerData(tableName);
    const updatedContainerData = await Promise.all(
      containerdata.map(async (item) => {
        item.ComponentConfiguration = await CommonFunctions.parseJson(item.ComponentConfiguration);
        item.TemplateConfiguration = await CommonFunctions.parseJson(item.TemplateConfiguration);
        return item;
      })
    );
    return updatedContainerData.filter(item => item !== null);
  };

  // Find the background image header from the data
  const GetBackgroundImage = (smartData, containers) => {
    let backgroundImage = null;

    smartData.forEach(smartItem => {
      containers.forEach(item => {
        smartItem.PageContainers.forEach(pageItem => {
          if (pageItem.Title === item.Title && item.TemplateConfiguration.selectedType === "BackgroundImage") {
            backgroundImage = item;
          }
        });
      });
    });
    setcontainerNottagg(pageFlag);
    return backgroundImage;
  };

  if (loading) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <div id="wrapper" className="clearfix">
      <Navbar />
      {containerNottag ? (
        <><BannerSlider
          id={PageTitle}
          PageTitle={PageTitle}
          ContainerTitle={backgroundImageHeader?.Title}
          urlRoute={`/${PageTitle}`}
          btn=""
          mainpage="mainpage" />
          <PageSubMenu />
          <SmartPageContainer id={PageTitle} PageTitle={PageTitle} />
          </>
      ):(<SmartPage/>)}
      <Footer />
    </div>
  );
}
