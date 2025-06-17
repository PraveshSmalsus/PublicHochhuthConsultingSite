import React, { useEffect, useState } from 'react';
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
import BannerSlider from "../components/BannerSlider";
import PageSubMenu from "../components/PageSubMenu";

export default function FullContainer(props) {
    const PageTitle = props.PageTitle;
    const ContainerTitle = props.ContainerTitle;
    const selectedType = props.selectedType;
    const backgroundImageHeader = props.backgroundImageHeader;
    const [FullContanerdata, setFullContanerdata] = useState([]);

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
        <>
             {
                selectedType == 'BackgroundImage' && (<><BannerSlider
                    id={PageTitle}
                    PageTitle={PageTitle}
                    ContainerTitle={backgroundImageHeader}
                    urlRoute={`/${PageTitle}`}
                    btn=""
                    mainpage="mainpage" /></>)
            }
            {selectedType == 'ImageAndContent' && (
                <section id="section-benefits" className="page-section section m-0 pt-0 bg-transparent">
                    <div className="vertical-middle">
                        <div className="container clearfix">
                            <div className="heading-block center">
                                {FullContanerdata.map((item, index) => {
                                    return <h2 key={index}>{item.Title}</h2>;
                                })}
                            </div>
                            <div className="row col-mb-50">
                                <div className="col-sm-12 col-md-4 col-lg-5">
                                    <div className="benefit-img1">
                                        <img src="https://testing.hochhuth-consulting.de/images/benefit-img1.png" alt="" />
                                    </div>
                                    <div className="benefit-img1 upper-benefit-img">
                                        <img src="https://testing.hochhuth-consulting.de/images/benefit-img2.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-7">
                                    {FullContanerdata.map((item, index) => (
                                        <div key={index} className="benefit-item">
                                            <div dangerouslySetInnerHTML={{ __html: item.Description }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>)}
            {selectedType == 'SiteTheme' && ContainerTitle.toLowerCase() == 'our philosophy' && (
                <section id="our-philosophy"
                    className="page-section section bg-transparent m-0"
                >
                    <div className="container clearfix">
                        <div className="heading-block center">
                            {FullContanerdata.map((item, index) => {
                                return <><h2 key={index}>{item.Title}</h2><span>
                                    {item.SubHeading}
                                </span></>;
                            })}
                        </div>
                        <div className="row justify-content-center mb-0">
                            <div className="col-md-8 bottommargin">
                                <div className="border-bottom-0  text-justify bottommargin">
                                    {FullContanerdata.map((item, index) => {
                                        return <div dangerouslySetInnerHTML={{ __html: item?.Description }} />;
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {selectedType == 'SiteTheme' && ContainerTitle.toLowerCase() == 'contact' && (
                <section
                    id="contact"
                    className="page-section section bg-transparent m-0"
                >
                    <div className="container clearfix">
                        <div className="heading-block center">
                            {FullContanerdata.map((item, index) => {
                                return <><h2 key={index}>{item.Title}</h2><span>
                                    {item.SubHeading}
                                    <a href="mailto:info@hochhuth-consulting.de">
                                        info@hochhuth-consulting.de
                                    </a>
                                </span>
                                </>;
                            })}
                            <a
                                href="/contact"
                                className="mt-4 button button-border button-rounded button-fill fill-from-right button-blue"
                            >
                                <span>Contact</span>
                            </a>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
