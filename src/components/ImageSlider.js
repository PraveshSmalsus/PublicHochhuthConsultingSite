import React, { useEffect, useState } from 'react';
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
let SmartPageData = []
let containerListData = []
let teamListData = []
export default function TeamCard(props) {
    const GridTitle = props.ContainerTitle
    const PageTitle = props.PageTitle
    const [homePageData, setHomePageData] = useState([]);
    useEffect(() => {
        GetAllSmartMetaData('SmartMetaData');
        initializeCarousel()
    }, []);

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
        SmartPageData = updatedSmartData.filter(item => item !== null);
        GetAllContainerListData('ContainerList');
    };

    const GetAllContainerListData = async (tableName) => {
        const containerdata = await getPublicServerData(tableName);
        const updatedContainerData = await Promise.all(
            containerdata.map(async (item) => {
                item.AdditionalImageSource = await CommonFunctions.parseJson(item.AdditionalImageSource);
                return item;
            })
        );
        containerListData = updatedContainerData;
        GetAllTeamDetailListData('ImageSlider');
    };

    const GetAllTeamDetailListData = async (tableName) => {
        const teamdata = await getPublicServerData(tableName);
        teamListData = teamdata;

        const updatedCareerPageData = SmartPageData.map((smartItem) => {
            if (smartItem.PageContainers.length > 0) {
                smartItem.PageContainers.forEach((pageItem) => {
                    containerListData.forEach((containerItem) => {
                        if (
                            containerItem.id == pageItem.Id &&
                            containerItem.Title.toLowerCase() == GridTitle.toLowerCase() &&
                            !smartItem.SectionPart.some(item => item.id === containerItem.id)  // Check if item is already in SectionPart
                        ) {
                            smartItem.SectionPart.push(containerItem);
                        }
                    });
                });
            }
            if (smartItem.SectionPart.length > 0) {
                smartItem.SectionPart[0].SectionDesc = [];
                smartItem.SectionPart[0].AdditionalImageSource
                    .forEach((section) => {
                        section.SectionDesc = [];
                        teamListData.forEach((teamItem) => {
                            if (section.Id == teamItem.id) {
                                smartItem.SectionPart[0].SectionDesc.push(teamItem);
                            }
                        });
                    });
            }

            return smartItem;
        });

        setHomePageData(updatedCareerPageData)
    };

    const initializeCarousel = () => {
      const $owl = window.$(".owl_1");
      if ($owl.length) {
        $owl.owlCarousel({
          loop: false,
          rewind: true,
          margin: 0,
          nav: true,
          dots: false,
          items: 1,
          smartSpeed: 1000,
          autoplay: false,
          navText: [
            '<i className="icon-angle-left"></i>',
            '<i className="icon-angle-right"></i>',
          ],
        });
    
        const $carouselNavLinks = window.$(".carousel-nav a");
        $carouselNavLinks.each(function (slideIndex) {
          const $this = window.$(this);
          $this.attr("data-num", slideIndex);
          $this.click(function (e) {
            $owl.trigger("to.owl.carousel", [slideIndex, 1500]);
            e.preventDefault();
          });
        });
    
        $owl.on("changed.owl.carousel", function (event) {
          $carouselNavLinks.removeClass("active");
          window
            .$(".carousel-nav a[data-num=" + event.item.index + "]")
            .addClass("active");
        });
      }
    };
  
   
  return (
    <section id="section-howwework" className="page-section section bg-transparent m-0">
      <div className="vertical-middle">
        <div className="container clearfix">
          <div className="heading-block center">
            {homePageData.map((smartItem) => (
              smartItem.SectionPart.length > 0 && (
                <div key={smartItem.id}>
                  {smartItem.SectionPart.map((section) => (
                    section.Title && (
                      <div key={section.id}>
                        <h2>{section.Title}</h2>
                      </div>
                    )
                  ))}
                </div>
              )
            ))}
          </div>

          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="owl-carousel owl_1">
                {homePageData.map((smartItem) =>
                  smartItem.SectionPart.length > 0 &&
                  smartItem.SectionPart.map((section) =>
                    section.SectionDesc.length > 0 &&
                    section.SectionDesc
                      .sort((a, b) => a.SortOrder - b.SortOrder) // Sorting by SortOrder
                      .map((sliderItem) => (
                        <div key={sliderItem.id} className="media-29101 d-md-flex w-100">
                          <div className="row align-items-center">
                            <div className="col-lg-7 col-sm-7">
                              <div className="heading-block">
                                <h4>{sliderItem.Title}</h4>
                              </div>
                              <div
                                className="mt-1 pt-1"
                                dangerouslySetInnerHTML={{
                                  __html: sliderItem.ItemDescription,
                                }}
                              ></div>
                            </div>
                            <div className="col-lg-4 col-sm-5">
                              <div id="carouselSF" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                  <div className="carousel-item active" data-interval="3000">
                                    <img
                                      src="images/SF-1.png"
                                      className="d-block w-100"
                                      alt="..."
                                    />
                                  </div>
                                  <div className="carousel-item" data-interval="3000">
                                    <img
                                      src="images/SF-2.png"
                                      className="d-block w-100"
                                      alt="..."
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  )
                )}
              </div>

              <div className="d-flex row justify-content-between carousel-nav">
                {homePageData.map((smartItem) =>
                  smartItem.SectionPart.length > 0 &&
                  smartItem.SectionPart.map((section) =>
                    section.SectionDesc.length > 0 &&
                    section.SectionDesc
                      .sort((a, b) => a.SortOrder - b.SortOrder) // Sorting by SortOrder
                      .map((sliderItem, sliderIndex) => (
                        <a
                          key={sliderItem.id}
                          className={`col-lg-4 col-md-4 mt-2 ${sliderIndex === 0 ? "active" : ""}`}
                          href="#"
                        >
                          <div className="Slider-text">
                            <div className="Sliderbox-text">0{sliderIndex + 1}</div>
                            <h3>{sliderItem.Title}</h3>
                          </div>
                        </a>
                      ))
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
}
