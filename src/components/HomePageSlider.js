import React, { useRef, useEffect, useState } from 'react';
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
import axios from "axios";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

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
  const sliderRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [data, setData] = useState([]);

  const settings = {
    dots: false,
    speed: 2000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 9000,
    nextArrow: <IoChevronForwardOutline />,
    prevArrow: <IoChevronBackOutline />,
    initialSlide: 0,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1200) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function formatTitle(text) {
    return text.replace(/-/g, ' ');
  }
  useEffect(() => {
    const GetAllSmartMetaData = async (tableName) => {
      const smartdata = await getPublicServerData(tableName);
      const updatedSmartData = await Promise.all(
        smartdata.map(async (item) => {
          item.SectionPart = [];
          item.PageContainers = await CommonFunctions.parseJson(item.PageContainers);
          if (item.Title.toLowerCase() == formatTitle(PageTitle).toLowerCase()) {
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
                // Prevent pushing duplicates
                if (!SliderSection.some(item => item.id === containerItem.id)) {
                  SliderSection.push(containerItem);
                }
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
                  // Prevent pushing duplicates to SectionDesc
                  if (!smartItem.SectionPart[0].SectionDesc.some(item => item.id == teamItem.id)) {
                    smartItem.SectionPart[0].SectionDesc.push(teamItem);
                  }

                  // Prevent pushing duplicates to SliderData
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
      setImageSliderItems(SliderData);
      setHomePageData(updatedCareerPageData);
    };
  }, []);

  const HTMLRenderer = ({ content }) => (
    <div className="html-content" dangerouslySetInnerHTML={{ __html: content }} />
  );
  useEffect(() => {
    // Ensure slider goes to the first item on mount
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [data]);

  //   const GetAllImageSliderListData = async (tableName) => {
  //     const teamdata = await getPublicServerData(tableName);
  //     teamListData = teamdata;

  //     const updatedCareerPageData = SmartPageData.map((smartItem) => {
  //       if (smartItem.PageContainers.length > 0) {
  //         smartItem.PageContainers.forEach((pageItem) => {
  //           containerListData.forEach((containerItem) => {
  //             if (
  //               containerItem.id == pageItem.Id &&
  //               containerItem.Title.toLowerCase() == GridTitle.toLowerCase() &&
  //               !smartItem.SectionPart.some(item => item.id === containerItem.id)  // Check if item is already in SectionPart
  //             ) {
  //               smartItem.SectionPart.push(containerItem);
  //               SliderSection.push(containerItem)
  //             }
  //           });
  //         });
  //       }
  //       if (smartItem.SectionPart.length > 0) {
  //         smartItem.SectionPart[0].SectionDesc = [];
  //         smartItem.SectionPart[0].AdditionalImageSource
  //           .forEach((section) => {
  //             section.SectionDesc = [];
  //             teamListData.forEach((teamItem) => {
  //               if (section.Id == teamItem.id) {
  //                 // Check if teamItem.id is already in SectionDesc or SliderData
  //                 if (!smartItem.SectionPart[0].SectionDesc.some(item => item.id == teamItem.id)) {
  //                   smartItem.SectionPart[0].SectionDesc.push(teamItem);
  //                 }

  //                 if (!SliderData.some(item => item.id == teamItem.id)) {
  //                   SliderData.push(teamItem);
  //                 }
  //               }
  //             });
  //           });
  //       }

  //       return smartItem;
  //     });
  //     setSliderItems(SliderSection);
  //     setImageSliderItems(SliderData)
  //     setHomePageData(updatedCareerPageData)
  //   };
  // }, []);

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
    <>
      {selectedType == 'Slider-1'&& (
        <section id="how-we-work" className="page-section section bg-transparent m-0">
          <div className="vertical-middle">
            <div className="container clearfix">
              <div className="heading-block center">
                {SliderItems
                  .filter((item, index, self) =>
                    index === self.findIndex((t) => t.Title === item.Title)
                  )
                  .map((item, index) => (
                    <React.Fragment key={index}>
                      <h2>{item.Title}</h2>
                      <span>{item.SubHeading}</span>
                    </React.Fragment>
                  ))}
              </div>

              <div className="row align-items-center">
                <div className="col-lg-12">
                  <div className="owl-carousel owl_1">
                    {ImageSliderItems
                      .filter((item, index, self) =>
                        index === self.findIndex((t) => t.Title === item.Title)
                      )
                      .map((item, index) => (
                        <div key={index} className="media-29101 d-md-flex w-100">
                          <div className="row align-items-center">
                            <div className="col-lg-7 col-sm-7">
                              <div className="heading-block">
                                <h4 className="text-uppercase">{item?.Title}</h4>
                              </div>
                              <ReadMoreContent content={item?.ItemDescription} />
                            </div>
                            <div className="col-lg-4 col-sm-5">
                              <img alt="" src={item?.ItemCover} />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="d-flex row justify-content-between carousel-nav">
                    {ImageSliderItems
                      .filter((item, index, self) =>
                        index === self.findIndex((t) => t.Title === item.Title)
                      )
                      .map((item, index) => (
                        <a key={index} href="h" className={`col-lg-3 col-md-4 mt-2 ${index === 0 ? "active" : ""}`}>
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

      {/* {selectedType == 'Slider-1' && PageTitle.toLowerCase() == 'careers' && (
        <section id="section-howwework" className="page-section section bg-transparent m-0">
          <div className="vertical-middle">
            <div className="container clearfix">
              <div className="heading-block center">
                {SliderItems
                  .filter((item, index, self) =>
                    index === self.findIndex((t) => t.Title === item.Title)
                  )
                  .map((item, index) => (
                    <h2 key={index}>{item.Title}</h2>
                  ))}
              </div>
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <div className="owl-carousel owl_1">
                    {ImageSliderItems
                      .filter((item, index, self) =>
                        index === self.findIndex((t) => t.Title === item.Title)
                      )
                      .map((item, index) => (
                        <div key={index} className="media-29101 d-md-flex w-100">
                          <div className="row align-items-center">
                            <div className="col-lg-7 col-sm-7">
                              <div className="heading-block">
                                <h4>{item.Title}</h4>
                              </div>
                              <div className="mt-1 pt-1" dangerouslySetInnerHTML={{ __html: item.ItemDescription }}></div>
                            </div>
                            <div className="col-lg-4 col-sm-5">
                              <div id="carouselSF" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                  <div className="carousel-item active" data-interval="3000">
                                    <img src={item.ItemCover} className="d-block w-100" alt="..." />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="d-flex row justify-content-between carousel-nav">
                    {ImageSliderItems
                      .filter((item, index, self) =>
                        index === self.findIndex((t) => t.Title === item.Title)
                      )
                      .map((item, index) => (
                        <a key={index} className={`col-lg-4 col-md-4 mt-2 ${index === 0 ? "active" : ""}`} href="h">
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
      )} */}
      {selectedType == 'Slider-2' && (
        <section className="carouselSlider">
          <Slider ref={sliderRef} {...settings}>
            {SliderItems &&
              SliderItems?.map((Parentitem) =>
                Parentitem.SectionDesc.map((item) => (
                  <div key={item.id}>
                    <div
                      className="slide-item"
                      style={{
                        backgroundImage: `url(${item?.ItemCover})`,
                        height: "430px",
                        width: "100%", // use % instead of auto for responsive design
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="slider-bg-overlay"></div>
                      <div className="sliderDescription">
                        <div className="container">
                          <div className="containerDetail">
                            <h2>
                              <Link
                                to={
                                  item?.Title === `People's Climate March - "Es gibt keinen Planet B"`
                                    ? "https://www.gruene-weltweit.de/Documents/Topics/Positionen/2017-04-27_Flyer_Why_We_March_Climate_March_BLS.pdf"
                                    : item?.smartPage
                                }
                                className="text-white"
                              >
                                {item?.Title}
                              </Link>
                            </h2>
                            <div className="subhead">
                              <p>
                                <HTMLRenderer content={item.ItemDescription} />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
          </Slider>

        </section>
      )}
    </>

  );
}
