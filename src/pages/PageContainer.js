import React, { useEffect, useState } from 'react';

import "../App.css";
import BannerSlider from "../components/BannerSlider";
import Navbar from "../components/Navbar";
import PageSubMenu from "../components/PageSubMenu";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
export default function Home() {
  const [content, setContent] = useState([]);
  useEffect(() => {
    const GetAllSmartMetaData = async (tableName) => {
        const smartdata = await getPublicServerData(tableName);
        const updatedSmartData = await Promise.all(
            smartdata.map(async (item) => {
                item.SectionPart = [];
                item.PageContainers = await CommonFunctions.parseJson(item.PageContainers);
                if (item.Title.toLowerCase() === PageTitle.toLowerCase()) {
                    return item;  // Return the item if it matches
                }
                return null;  // Return null if it doesn't match
            })
        );
        const SmartPageData = updatedSmartData.filter(item => item !== null);
        console.log(SmartPageData);
        GetAllContainerListData('ContainerList');
    };

    const GetAllContainerListData = async (tableName) => {
        const containerdata = await getPublicServerData(tableName);
        const updatedContainerData = await Promise.all(
            containerdata.map(async (item) => {
                item.TeamInformation = await CommonFunctions.parseJson(item.TeamInformation);
                item.TemplateConfiguration = await CommonFunctions.parseJson(item.TemplateConfiguration);
                item.ComponentConfiguration = await CommonFunctions.parseJson(item.ComponentConfiguration);
                if (item.Title.toLowerCase() === ContainerTitle.toLowerCase()) {
                    return item;  // Return the item if it matches
                }
                return null;  // Return null if it doesn't match
            })
        );
        const containerListData = updatedContainerData.filter(item => item !== null);
        setFullContanerdata(containerListData);
    };

    GetAllSmartMetaData('SmartMetaData');
}, [PageTitle, ContainerTitle]);

  return (
    <div id="wrapper" className="clearfix">
      <Navbar />
      <BannerSlider id="home" PageTitle={'Home'}  ContainerTitle={'Basic Information of Organization'} urlRoute = {"/home"} btn="" mainpage="mainpage"/>
      <PageSubMenu />
      <HomeContent/>
      <Footer />
    </div>
  );
}
