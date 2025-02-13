import React, { useEffect, useState } from 'react';
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
import { HashLink } from "react-router-hash-link";

let containerListData = []
export default function BannerSlider(props) {
  const ContainerTitle = props.ContainerTitle
  const id = props.id
  const urlRoute = props.urlRoute
  const [BannerSliderdata, setBannerSliderdata] = useState([]);

  useEffect(() => {
    GetAllContainerListData('ContainerList');
  }, []);

  const GetAllContainerListData = async (tableName) => {
    const containerdata = await getPublicServerData(tableName);
    const updatedContainerData = await Promise.all(
      containerdata.map(async (item) => {
        item.ComponentConfiguration = await CommonFunctions.parseJson(item.ComponentConfiguration);
        if (item.Title.toLowerCase() === ContainerTitle.toLowerCase()) {
          return item;  // Return the item if it matches
        }
        return null;  // Return null if it doesn't match
      })
    );
    containerListData = updatedContainerData.filter(item => item !== null);
    setBannerSliderdata(containerListData)
  };

  return (
    <section
      id="slider"
      className={`slider-element min-vh-100 dark include-header`}
    >
      {BannerSliderdata.map((item, index) => (
        <div id={id} key={index} className="slider-inner">
          <div className="container">
            <div className="slider-caption slider-caption-center">
              <h2 className="fadeInDown animated" data-animate="fadeInDown">
                {item.Heading}
              </h2>
  
              <div dangerouslySetInnerHTML={{ __html: item.SubHeading }} />
              {item.ComponentConfiguration && item.ComponentConfiguration.length > 0 && item.ComponentConfiguration.map((itemcomp, index) => (
                itemcomp.ComponentName && (
                  <div key={index} className="text-center mt-0 mt-md-4">
                    <HashLink
                      to={urlRoute}
                      data-href="#section-positions"
                      className="button button-border button-rounded button-fill fill-from-right button-white m-0"
                    >
                      <span>{itemcomp.ComponentName}</span>
                    </HashLink>
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="bg-overlay-bg op-05"></div>
        </div>
      ))}
    </section>
  );
  
}
