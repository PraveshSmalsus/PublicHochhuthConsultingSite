import React, { useEffect, useState } from 'react';

import "../App.css";
import BannerSlider from "../components/BannerSlider";
import Navbar from "../components/Navbar";
import PageSubMenu from "../components/PageSubMenu";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
import axios from 'axios';
export default function Home() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("https://argosmob.uk/api-random/get-home-banner.php")
      .then((response) => {
        if (response?.data?.success) {
          setContent(response?.data?.data);
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
      <BannerSlider id="home" PageTitle={'Home'}  ContainerTitle={'Basic Information of Organization'} urlRoute = {"/home"} btn="" mainpage="mainpage"/>
      <PageSubMenu/>
      <HomeContent id="home" PageTitle={'Home'}/>
      <Footer />
    </div>
  );
}
