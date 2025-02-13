import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataGrid from './DataGrid';
import TeamCard from './TeamCard'
import FullContainer from './FullContainer'
import HomePageSlider from './HomePageSlider';

export default function CareersContent() {
  
  return (
    <section id="content">
      <div
        className="wave-bottom"
        style={{
          position: "absolute",
          top: "-12px",
          left: 0,
          width: "100%",
          backgroundImage: "url('images/wave2.svg')",
          height: "12px",
          zIndex: 2,
          backgroundRepeat: "repeat-x",
          transform: "rotate(180deg)",
        }}
      ></div>
      <div className="content-wrap py-0">
        <TeamCard ContainerTitle={'meet our team'} PageTitle={'careers'} selectedType={'CardGrid-3'}/>
        <FullContainer ContainerTitle={'benefits'} PageTitle={'careers'} selectedType={'ImageAndContent'}/>
        <HomePageSlider ContainerTitle={'EMBRACING OUR CORPORATE CULTURE'} PageTitle={'careers'} selectedType={'Slider-1'}/>
        <DataGrid ContainerTitle={'OPEN POSITIONS'}  PageTitle={'careers'} selectedType={'CardGrid-2'}/>  
      </div>
    </section>
  );
}
