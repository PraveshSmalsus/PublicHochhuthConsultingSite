import React, { useEffect, useState } from 'react';
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
import { Link } from 'react-router-dom';


export default function TeamCard(props) {
    let SmartPageData = []
    let containerListData = []
    let teamListData = []
    const GridTitle = props.ContainerTitle
    const PageTitle = props.PageTitle
    const selectedType = props.selectedType;
    const Title = props.Title;
    const [homePageData, setHomePageData] = useState([]);
    useEffect(() => {
        GetAllSmartMetaData('SmartMetaData');
    }, []);
    function formatTitle(text) {
        return text.replace(/-/g, ' ');
    }
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

    const GetAllContainerListData = async (tableName) => {
        const containerdata = await getPublicServerData(tableName);
        const updatedContainerData = await Promise.all(
            containerdata.map(async (item) => {
                item.TeamInformation = await CommonFunctions.parseJson(item.TeamInformation);
                item.ComponentConfiguration = await CommonFunctions.parseJson(item?.ComponentConfiguration);
                return item;
            })
        );
        containerListData = updatedContainerData;
        GetAllTeamDetailListData('TeamDetails');
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
                smartItem.SectionPart[0].TeamInformation
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
        console.log(updatedCareerPageData);
    };

    return (
        <>
            {selectedType === 'CardGrid-1' && Title == 'TeamDataGrid' && (
                <section id="who-we-are" className="page-section section bg-transparent m-0">
                    <div className="container clearfix">
                        {homePageData?.map((smartItem, index) =>
                            smartItem.SectionPart?.length > 0 &&
                            smartItem.SectionPart.map((section, secIndex) => (
                                <React.Fragment key={`${index}-${secIndex}`}>
                                    <div className="heading-block center">
                                        <h2>{section.Heading}</h2>
                                        <span>{section.SubHeading}</span>
                                    </div>
                                    <div className="row justify-content-center mb-0">
                                        <div className="col-md-8 bottommargin">
                                            <div className="border-bottom-0 text-justify bottommargin">
                                                <div dangerouslySetInnerHTML={{ __html: section.About }} />
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))
                        )}
                        <div className="row justify-content-center mb-0">
                            <div className="col-md-8 bottommargin">
                                <div className="col-sm-12 col-md-12 col-lg-12 topmargin pl-0 pr-0 pt-4">
                                    <div className="founder-box">
                                        {homePageData?.map((smartItem, index) =>
                                            smartItem.SectionPart?.length > 0 &&
                                            smartItem.SectionPart.map((section, secIndex) =>
                                                section.SectionDesc?.length > 0 &&
                                                section.SectionDesc
                                                    .filter(item => item?.Title?.length > 0)
                                                    .sort((a, b) => a.SortOrder - b.SortOrder)
                                                    .map((teamItem, teamIndex) => (
                                                        <React.Fragment key={teamIndex}>
                                                            <div className="founder-upper-box text-center">
                                                                <img src={teamItem.ImageLink} alt="founderimg" />
                                                            </div>
                                                            <div className="founder-description">
                                                                <h3 className="founder-title">{teamItem.Title}</h3>
                                                                <p className="founder-subtitle">{teamItem.Designation}</p>
                                                                <div className="d-flex justify-content-center social-icons">
                                                                    <a href="https://www.linkedin.com" className="social-icon si-small si-borderless si-linkedin">
                                                                        <i className="icon-linkedin"></i>
                                                                        <i className="icon-linkedin"></i>
                                                                    </a>
                                                                    <a href="mailto:example@example.com" className="social-icon si-small si-borderless si-email3">
                                                                        <i className="icon-email3"></i>
                                                                        <i className="icon-email3"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <p className="founder-desc-text" dangerouslySetInnerHTML={{ __html: teamItem.About }}></p>
                                                            <div className="text-end founder-check-position-btn">
                                                                <div className="card-box-actionBtn">
                                                                    <a href="/careers#section-team" className="button button-border button-rounded button-fill fill-from-right button-blue">
                                                                        <span>Meet the Team</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    ))
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {selectedType === 'CardGrid-2' && Title == 'TeamDataGrid' && (
                <section id="section-team" className="page-section section bg-transparent m-0">
                    <div className="container clearfix">
                        <div className="heading-block center">
                            {homePageData?.map((smartItem, index) =>
                                smartItem.SectionPart?.length > 0 && (
                                    <div key={index}>
                                        {smartItem.SectionPart?.map((section, secIndex) => (
                                            <div key={secIndex}>
                                                <h2>{section.Title}</h2>
                                                <span>{section.SubHeading}</span>
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="row justify-content-center col-mb-50 mb-0 mt-6">
                            {homePageData?.map((smartItem, index) =>
                                smartItem.SectionPart?.length > 0 &&
                                smartItem.SectionPart.map((section, secIndex) =>
                                    section.SectionDesc?.length > 0 &&
                                    section.SectionDesc
                                        .filter(item => item?.Title?.length > 0)
                                        .sort((a, b) => a.SortOrder - b.SortOrder)
                                        .map((teamItem, teamIndex) => (
                                            <div key={teamIndex} className="col-sm-12 col-md-6 col-lg-6 d-flex">
                                                <div className="founder-box d-flex flex-column">
                                                    <div className="founder-upper-box text-center">
                                                        <img src={teamItem.ImageLink} alt="" />
                                                    </div>
                                                    <div className="founder-description">
                                                        <h3 className="founder-title">{teamItem.Title}</h3>
                                                        <div dangerouslySetInnerHTML={{ __html: teamItem.Designation }}></div>
                                                    </div>
                                                    <div dangerouslySetInnerHTML={{ __html: teamItem.About }}></div>
                                                    <div className="mt-3">
                                                        {section.SectionDesc.length - 1 === teamIndex && (
                                                            <div className="text-end founder-check-position-btn">
                                                                <Link to="/careers#section-positions">
                                                                    Check Open Positions
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                )
                            )}
                        </div>
                    </div>
                </section>
            )}
            {selectedType === 'CardGrid-3' && Title == 'TeamDataGrid' && (
                <section id="section-team" className="page-section section bg-transparent m-0">
                    <div className="container clearfix">
                        <div className="heading-block center">
                            {homePageData?.map((smartItem, index) =>
                                smartItem.SectionPart?.length > 0 && (
                                    <div key={index}>
                                        {smartItem.SectionPart?.map((section, secIndex) => (
                                            <div key={secIndex}>
                                                <h2>{section.Title}</h2>
                                                <span>{section.SubHeading}</span>
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="row justify-content-center col-mb-50 mb-0 mt-6">
                            {homePageData?.map((smartItem, index) =>
                                smartItem.SectionPart?.length > 0 &&
                                smartItem.SectionPart.map((section, secIndex) =>
                                    section.SectionDesc?.length > 0 &&
                                    section.SectionDesc
                                        .filter(item => item?.Title?.length > 0)
                                        .sort((a, b) => a.SortOrder - b.SortOrder)
                                        .map((teamItem, teamIndex) => (
                                            <div key={teamIndex} className="col-sm-12 col-md-6 col-lg-4 d-flex">
                                                <div className="founder-box d-flex flex-column">
                                                    <div className="founder-upper-box text-center">
                                                        <img src={teamItem.ImageLink} alt="" />
                                                    </div>
                                                    <div className="founder-description">
                                                        <h3 className="founder-title">{teamItem.Title}</h3>
                                                        <div dangerouslySetInnerHTML={{ __html: teamItem.Designation }}></div>
                                                    </div>
                                                    <div dangerouslySetInnerHTML={{ __html: teamItem.About }}></div>
                                                    <div className="mt-3">
                                                        {section.SectionDesc.length - 1 === teamIndex && (
                                                            <div className="text-end founder-check-position-btn">
                                                                <Link to="/careers#section-positions">
                                                                    Check Open Positions
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                )
                            )}
                        </div>
                    </div>
                </section>
            )}
            {selectedType === 'CardGrid-4' && Title == 'TeamDataGrid' && (
                <section id="section-team" className="page-section section bg-transparent m-0">
                    <div className="container clearfix">
                        <div className="heading-block center">
                            {homePageData?.map((smartItem, index) =>
                                smartItem.SectionPart?.length > 0 && (
                                    <div key={index}>
                                        {smartItem.SectionPart?.map((section, secIndex) => (
                                            <div key={secIndex}>
                                                <h2>{section.Title}</h2>
                                                <span>{section.SubHeading}</span>
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="row justify-content-center col-mb-50 mb-0 mt-6">
                            {homePageData?.map((smartItem, index) =>
                                smartItem.SectionPart?.length > 0 &&
                                smartItem.SectionPart.map((section, secIndex) =>
                                    section.SectionDesc?.length > 0 &&
                                    section.SectionDesc
                                        .filter(item => item?.Title?.length > 0)
                                        .sort((a, b) => a.SortOrder - b.SortOrder)
                                        .map((teamItem, teamIndex) => (
                                            <div key={teamIndex} className="col-sm-12 col-md-6 col-lg-3 d-flex">
                                                <div className="founder-box d-flex flex-column">
                                                    <div className="founder-upper-box text-center">
                                                        <img src={teamItem.ImageLink} alt="" />
                                                    </div>
                                                    <div className="founder-description">
                                                        <h3 className="founder-title">{teamItem.Title}</h3>
                                                        <div dangerouslySetInnerHTML={{ __html: teamItem.Designation }}></div>
                                                    </div>
                                                    <div dangerouslySetInnerHTML={{ __html: teamItem.About }}></div>
                                                    <div className="mt-3">
                                                        {section.SectionDesc.length - 1 === teamIndex && (
                                                            <div className="text-end founder-check-position-btn">
                                                                <Link to="/careers#section-positions">
                                                                    Check Open Positions
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                )
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
