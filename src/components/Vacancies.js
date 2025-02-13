import React, { useEffect, useState } from 'react';
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
import { Link } from 'react-router-dom';

let SmartPageData = []
let containerListData = []
let eventListData = []
export default function Vacancies(props) {
    const GridTitle = props.ContainerTitle
    const PageTitle = props.PageTitle
    const selectedType = props.selectedType;
    const [homePageData, setHomePageData] = useState([]);
    useEffect(() => {
        GetAllSmartMetaData('SmartMetaData');
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
                item.AdditionalContentSource = await CommonFunctions.parseJson(item.AdditionalContentSource);
                if (item.Title.toLowerCase() === GridTitle.toLowerCase()) {
                    return item;  // Return the item if it matches
                }
                return null;  // Return null if it doesn't match
            })
        );
        containerListData = updatedContainerData.filter(item => item !== null);
        setHomePageData(containerListData)
    };

    return (
        <>
            {selectedType == 'SiteTheme' && (
                <section id="content">
                    <div className="content-wrap py-0">
                        <div className="promo promo-light promo-full p-5">
                            <div className="container clearfix">
                                <div className="row align-items-center">
                                    {homePageData.map((smartItem, index) => (
                                        <><div className="col-12 col-lg-12 text-center text-uppercase">
                                            <h1>{smartItem.Heading}</h1>
                                        </div><div className="col-12 col-lg-12 text-center mt-3">
                                                <a
                                                    data-animate="fadeInUp"
                                                    href="/careers#section-positions"
                                                    className="button button-border button-rounded button-fill fill-from-right button-blue m-0"
                                                >
                                                    <span>{smartItem.Title}</span>
                                                </a>
                                            </div></>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </>

    );
}
