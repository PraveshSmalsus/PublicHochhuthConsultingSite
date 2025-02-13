import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SliderForCareers() {
  const [embrances, setEmbrances] = useState([]);

  useEffect(() => {
    axios
      .get("https://argosmob.uk/api-random/get-embrance-our-corporate.php")
      .then((response) => {
        if (response?.data?.success) {
          setEmbrances(response?.data?.data);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching the navigation data:", error);
      });
  }, []);

  useEffect(() => {
    if (embrances.length > 0) {
      initializeCarousel();
    }
  }, [embrances]);

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
          '<i class="icon-angle-left"></i>',
          '<i class="icon-angle-right"></i>',
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
    <section
      id="section-howwework"
      className="page-section section bg-transparent m-0"
    >
      <div className="vertical-middle">
        <div className="container clearfix">
          <div className="heading-block center">
            <h2>Embracing Our Corporate Culture</h2>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="owl-carousel owl_1">
                {embrances.map((item, index) => (
                  <div key={index} className="media-29101 d-md-flex w-100">
                    <div className="row align-items-center">
                      <div className="col-lg-7 col-sm-7">
                        <div className="heading-block">
                          <h4>{item.Title}</h4>
                        </div>
                        <div
                          className="mt-1 pt-1"
                          dangerouslySetInnerHTML={{
                            __html: item.Description,
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
                                alt="..."
                              />
                            </div>
                            <div
                              className="carousel-item"
                              data-interval="3000"
                            >
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
                ))}
              </div>
              <div className="d-flex row justify-content-between carousel-nav">
                {embrances.map((item, index) => (
                  <a
                    key={index}
                    className={`col-lg-4 col-md-4 mt-2 ${
                      index === 0 ? "active" : ""
                    }`}
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
  );
}