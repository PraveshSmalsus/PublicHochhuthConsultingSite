import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { getPublicServerData } from '../Service/GetDataApi'
export default function Navbar() {
  const baseUrl = window.location.origin;
  const [scrolled, setScrolled] = useState(false);
  const [navigations, setNavigations] = useState([]);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    GetAllFooterData('TopNavigation');
  }, []);

  const GetAllFooterData = async (tableName) => {
    const footerData = await getPublicServerData(tableName);
    setNavigations(footerData)
  };
  // Function to convert title to kebab-case
  const toKebabCase = (str) => {
    return str.toLowerCase().replace(/\s+/g, "-");
  };
  let navbarClasses = [
    "full-header transparent-header sticky-header page-section",
  ];
  if (scrolled) {
    navbarClasses.push("sticky-header-shrink");
  }
  return (
    <header id="header" className={navbarClasses.join(" ")}>
      <div id="header-wrap">
        <div className="container">
          <div className="header-row">
            <div id="logo">
              <Link
                to="/home"
                className="standard-logo"
                data-dark-logo={`${baseUrl}/images/logo.png`}
              >
                <img src={`${baseUrl}/images/logo.png`} alt="Logo" />
              </Link>
              <Link
                to="/home"
                className="retina-logo"
                data-dark-logo={`${baseUrl}/images/logo@2x.png`}
              >
                <img src={`${baseUrl}/images/logo@2x.png`} alt="Logo" />
              </Link>
            </div>

            <div className="header-misc">
              <div id="top-search" className="d-none header-misc-icon">
                <a href="h" id="top-search-trigger">
                  <i className="icon-line-search"></i>
                  <i className="icon-line-cross"></i>
                </a>
              </div>

              <div className="top-links d-none header-misc-icon logged-user">
                <a href="h" className="login-text hreflink ng-scope">
                  <i className="icon-user-circle1"></i>Sign In
                </a>
              </div>
            </div>

            <div id="primary-menu-trigger">
              <svg className="svg-trigger" viewBox="0 0 100 100">
                <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
                <path d="m 30,50 h 40"></path>
                <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
              </svg>
            </div>


            <nav className="primary-menu">
              <ul
                className="menu-container one-page-menu"
                data-easing="easeInOutExpo"
                data-speed="1500"
              >
                {navigations.map((navItem, index) => (

                  <li className="menu-item" key={index}>
                    <HashLink
                      className="menu-link"
                      to={(navItem.Title === "Careers") ? `/careers` : `/home#${toKebabCase(navItem.Title)}`}
                      data-href={toKebabCase(navItem.Title)}
                    >
                      <div>{navItem.Title}</div>
                    </HashLink>
                  </li>
                ))}
              </ul>
            </nav>

            <form className="top-search-form" action="search.html" method="get">
              <input
                type="text"
                name="q"
                className="form-control"
                value
                placeholder="Type &amp; Hit Enter.."
                autoComplete="off"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="header-wrap-clone"></div>
    </header>
  );
}
