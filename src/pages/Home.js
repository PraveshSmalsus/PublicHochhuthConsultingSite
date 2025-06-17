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
import { Helmet } from 'react-helmet';

let pageFlag;
const baseUrl = window.location.origin;
export default function Home(props) {
  const PageTitle = props.Title;
  

  // State variables to store fetched data
  const [smartPageData, setSmartPageData] = useState([]);
  const [backgroundImageHeader, setBackgroundImageHeader] = useState(null);
  const [containerListData, setContainerListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [containerNottag, setcontainerNottag] = useState(false);

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
    // return decodeURIComponent(encodedString);
    const decoded = decodeURIComponent(encodedString);
    return decoded.replace(/-/g, ' ');
  }

  // Fetch smart meta data and filter by title
  const GetAllSmartMetaData = async (tableName) => {
    setcontainerNottag(false)
    pageFlag = false;
    const smartdata = await getPublicServerData(tableName);
    const updatedSmartData = await Promise.all(
      smartdata.map(async (item) => {
        item.PageContainers = await CommonFunctions.parseJson(item.PageContainers);
        if (item.Title.toLowerCase() === decodeURLString(PageTitle).toLowerCase()) {
          if (item.PageContainers != undefined && item.PageContainers.length > 0) {
            //setcontainerNottag(true)
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
    setcontainerNottag(pageFlag);
    return backgroundImage;
  };

  if (loading) {
    return <div></div>; // Or some loading spinner
  }

  return (
    <div id="wrapper" className="clearfix">
    <Helmet>
<title>Hochhuth Consulting - Experts in Digital Transformation and Business Consulting</title>
<meta name="description" content="Hochhuth Consulting specializes in digital transformation, agile project management, and business consulting. Partner with us to achieve your business goals." />
<meta name="keywords" content="Hochhuth Consulting, digital transformation, business consulting, project management, IT consulting, agile consulting, business transformation, governance consulting" />
<meta name="author" content="Hochhuth Consulting" />
<meta name="robots" content="index, follow" />
<meta property="og:title" content="Hochhuth Consulting - Experts in Digital Transformation and Business Consulting" />
<meta property="og:description" content="Partner with Hochhuth Consulting for expert solutions in digital transformation, project management, and business consulting." />
<meta property="og:image" content={`${baseUrl}/images/hochhuth-banner.jpg`} />
<meta property="og:url"  content={`${baseUrl}/`} />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Hochhuth Consulting" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Hochhuth Consulting - Experts in Digital Transformation and Business Consulting" />
<meta name="twitter:description" content="Discover how Hochhuth Consulting can help your business thrive with expert consulting services in digital transformation and project management." />
<meta name="twitter:image"  content={`${baseUrl}/images/hochhuth-banner.jpg`} />
<link rel="canonical" href={baseUrl} />
    </Helmet>
      <Navbar />
      {containerNottag ? (
        <>
        
        {/* <BannerSlider
          id={PageTitle}
          PageTitle={PageTitle}
          ContainerTitle={backgroundImageHeader?.Title}
          urlRoute={`/${PageTitle}`}
          btn=""
          mainpage="mainpage" />*/}
          {/* <PageSubMenu />  */}
          <SmartPageContainer id={PageTitle} PageTitle={PageTitle} backgroundImageHeader={backgroundImageHeader?.Title}/>
          </>
      ):(<SmartPage/>)}
      <Footer />
    </div>
  );
}
