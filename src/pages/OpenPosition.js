import React, { useEffect, useState } from 'react';
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReadMoreBanner from '../components/ReadMoreBanner';
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
let SmartPageData = []
let containerListData = []
let eventListData = []
export default function OpenPosition(props) {
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
                return item;
            })
        );
        containerListData = updatedContainerData;
        GetAllEventListData('Events');
    };

    const GetAllEventListData = async (tableName) => {
        const eventdata = await getPublicServerData(tableName);
        eventListData = eventdata;
        const updatedHomePageData = SmartPageData.map((smartItem) => {
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
                smartItem.SectionPart[0].AdditionalContentSource
                    .forEach((section) => {
                        section.SectionDesc = [];
                        eventListData.forEach((eventItem) => {
                            if (section.Id == eventItem.id) {
                                smartItem.SectionPart[0].SectionDesc.push(eventItem);
                            }
                        });
                    });
            }

            return smartItem;
        });

        setHomePageData(updatedHomePageData)
    };
  return (
    <div id="wrapper" className="clearfix">
      <Navbar />
      <ReadMoreBanner heading=" Junior Digital Governance Specialist (w/m/d) bei Hochhuth Consulting
            in Berlin" subheading="Kurz- oder Langfristig | Vollzeit oder Teilzeit | ab 1. Juli (oder
            frühestmöglich)"/>
      
      <section id="content">
			<div className="content-wrap">
				<section className="page-section mt-0 section bg-transparent pt-0">
					<div className="container clearfix">
						<div className="vacancydetail-desc" ng-bind-html="Vacancies[0].Description | trustedHTML">
							<div className="ExternalClass7030A43113E14C2590231703696A4B1B">
                            {homePageData.map((smartItem, index) => (
                                        smartItem.SectionPart.length > 0 && smartItem.SectionPart.map((section, secIndex) => (
                                            section.SectionDesc.length > 0 && section.SectionDesc.map((eventItem, eventIndex) => (
                                                <div dangerouslySetInnerHTML={{
                                                    __html: eventItem?.Description,
                                                }}
                                            ></div>
                                            ))
                                        ))
                                    ))}
							</div>
						</div>
					</div>
				</section>
			</div>
		</section>
      <Footer />
    </div>
  )
}
