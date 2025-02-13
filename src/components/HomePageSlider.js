import React, { useEffect, useState } from 'react';
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
import axios from "axios";

const ReadMoreContent = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const characterLimit = 500;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const shortContent =
    content.length > characterLimit
      ? content.slice(0, characterLimit)
      : content;

  useEffect(() => {
    if (content.length > characterLimit) {
      setShowReadMore(true);
    }
  }, [content]);

  return (
    <div className="text-justify">
      <div
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? content
            : shortContent + (showReadMore ? "..." : ""),
        }}
      />
      {showReadMore && (
        <span
          onClick={toggleReadMore}
          className="read-more-button btn-link"
          style={{ cursor: "pointer" }}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </span>
      )}
    </div>
  );
};
let SmartPageData = []
let containerListData = []
let teamListData = []

export default function HomePageSlider(props) {
  let SliderData = []
let SliderSection = []
  const GridTitle = props.ContainerTitle
  const PageTitle = props.PageTitle
  const selectedType = props.selectedType;
  const [homePageData, setHomePageData] = useState([]);
  const [ImageSliderItems, setImageSliderItems] = useState([]);
  const [SliderItems, setSliderItems] = useState([])

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
      SmartPageData = updatedSmartData.filter(item => item !== null);
      GetAllContainerListData('ContainerList');
    };
    GetAllSmartMetaData('SmartMetaData');

    const GetAllContainerListData = async (tableName) => {
      const containerdata = await getPublicServerData(tableName);
      const updatedContainerData = await Promise.all(
        containerdata.map(async (item) => {
          item.AdditionalImageSource = await CommonFunctions.parseJson(item.AdditionalImageSource);
          return item;
        })
      );
      containerListData = updatedContainerData;
      GetAllImageSliderListData('ImageSlider');
    };

    const GetAllImageSliderListData = async (tableName) => {
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
                SliderSection.push(containerItem)
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
                  // Check if teamItem.id is already in SectionDesc or SliderData
                  if (!smartItem.SectionPart[0].SectionDesc.some(item => item.id == teamItem.id)) {
                    smartItem.SectionPart[0].SectionDesc.push(teamItem);
                  }

                  if (!SliderData.some(item => item.id == teamItem.id)) {
                    SliderData.push(teamItem);
                  }
                }
              });
            });
        }

        return smartItem;
      });
      setSliderItems(SliderSection);
      setImageSliderItems(SliderData)
      setHomePageData(updatedCareerPageData)
    };
  }, []);

  useEffect(() => {
    if (ImageSliderItems.length > 0) {
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
            '<i class="icon-angle-left"></i>',
            '<i class="icon-angle-right"></i>',
          ],
        });

        // Initialize carousel navigation
        const $carouselNavLinks = window.$(".carousel-nav a");
        $carouselNavLinks.each(function (slideIndex) {
          const $this = window.$(this);
          $this.attr("data-num", slideIndex);
          $this.click(function (e) {
            $owl.trigger("to.owl.carousel", [slideIndex, 1500]);
            e.preventDefault();
          });
        });

        // Handle carousel change event
        $owl.on("changed.owl.carousel", function (event) {
          $carouselNavLinks.removeClass("active");
          window
            .$(".carousel-nav a[data-num=" + event.item.index + "]")
            .addClass("active");
        });
      }
    }
    return () => {
      const $owl = window.$(".owl_1");
      if ($owl.length) {
        $owl.trigger("destroy.owl.carousel");
      }
    };
  }, [ImageSliderItems]);

  return (
    <> {selectedType == 'Slider-1' && PageTitle.toLowerCase() == 'home' && (
      <section
        id="how-we-work"
        className="page-section section bg-transparent m-0"
      >
        <div className="vertical-middle">
          <div className="container clearfix">
            <div className="heading-block center">
              {SliderItems.map((item, index) => {
                return <><h2 key={index}>{item.Title}</h2><span>
                  {item.SubHeading}
                </span></>
              })}
            </div>

            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="owl-carousel owl_1">
                  {ImageSliderItems.map((item, index) => (
                    <div key={index} className="media-29101 d-md-flex w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-7 col-sm-7">
                          <div className="heading-block">
                            <h4 className="text-uppercase">{item?.Title}</h4>
                          </div>
                          <ReadMoreContent content={item?.ItemDescription} />
                        </div>
                        <div className="col-lg-4 col-sm-5">
                          <img
                            alt=""
                            src="images/GR_Hochhuth_Strategie_page-0001-1.jpg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex row justify-content-between carousel-nav">
                  {ImageSliderItems.map((item, index) => (
                    <a
                      key={index}
                      href="h"
                      className={`col-lg-3 col-md-4 mt-2 ${index === 0 ? "active" : ""}`}
                    >
                      <div className="Slider-text">
                        <div className="Sliderbox-text">0{index + 1}</div>
                        <h3>{item?.Title}</h3>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )}
      {selectedType == 'Slider-1' && PageTitle.toLowerCase() == 'careers' && (
        <section
          id="section-howwework"
          className="page-section section bg-transparent m-0"
        >
          <div className="vertical-middle">
            <div className="container clearfix">
              <div className="heading-block center">
                {SliderItems.map((item, index) => {
                  return <h2 key={index}>{item.Title}</h2>;
                })}
              </div>
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <div className="owl-carousel owl_1">
                    {ImageSliderItems.map((item, index) => (
                      <div key={index} className="media-29101 d-md-flex w-100">
                        <div className="row align-items-center">
                          <div className="col-lg-7 col-sm-7">
                            <div className="heading-block">
                              <h4>{item.Title}</h4>
                            </div>
                            <div
                              className="mt-1 pt-1"
                              dangerouslySetInnerHTML={{
                                __html: item.ItemDescription,
                              }}
                            ></div>
                          </div>
                          <div className="col-lg-4 col-sm-5">
                            <div
                              id="carouselSF"
                              className="carousel slide"
                              data-ride="carousel"
                            >
                              <div className="carousel-inner">
                                <div
                                  className="carousel-item active"
                                  data-interval="3000"
                                >
                                  <img
                                    src="images/SF-1.png"
                                    className="d-block w-100"
                                    alt="..." />
                                </div>
                                <div
                                  className="carousel-item"
                                  data-interval="3000"
                                >
                                  <img
                                    src="images/SF-2.png"
                                    className="d-block w-100"
                                    alt="..." />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex row justify-content-between carousel-nav">
                    {ImageSliderItems.map((item, index) => (
                      <a
                        key={index}
                        className={`col-lg-4 col-md-4 mt-2 ${index === 0 ? "active" : ""}`}
                        href="h"
                      >
                        <div className="Slider-text">
                          <div className="Sliderbox-text">0{index + 1}</div>
                          <h3>{item.Title}</h3>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}</>
  );
}
