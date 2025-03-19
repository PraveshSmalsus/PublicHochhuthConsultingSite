import React, { useEffect, useState } from 'react';
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
import { Link } from 'react-router-dom';

const ReadMoreContent = ({ content }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const characterLimit = 200;

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const shortContent = content?.length > characterLimit ? content.slice(0, characterLimit) : content;

    useEffect(() => {
        if (content?.length > characterLimit) {
            setShowReadMore(true);
        }
    }, [content]);

    return (
        <div className="text-justify">
            <div
                dangerouslySetInnerHTML={{
                    __html: isExpanded ? content : shortContent + (showReadMore ? '...' : '')
                }}
            />
            {showReadMore && (
                <span onClick={toggleReadMore} className="read-more-button btn-link" style={{ cursor: "pointer" }}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </span>
            )}
        </div>
    );
};
let SmartPageData = []
let containerListData = []
let eventListData = []
export default function DataGrid(props) {
    const GridTitle = props.ContainerTitle
    const PageTitle = props.PageTitle
    const selectedType = props.selectedType;
    const Title = props.Title;
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
            if (smartItem.PageContainers?.length > 0) {
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
            if (smartItem.SectionPart?.length > 0) {
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
        <>
            {selectedType == 'CardGrid-3' && (
                <section id="what-we-offer" className="page-section section bg-transparent">
                    <div className="vertical-middle">
                        <div className="container clearfix">
                            <div className="heading-block center">
                                {homePageData.map((smartItem, index) => (
                                    smartItem.SectionPart?.length > 0 && (
                                        <div key={index}>
                                            {smartItem.SectionPart.map((section, secIndex) => (
                                                <div key={secIndex}>
                                                    <h2>{section.Title}</h2>
                                                    <span>{section.SubHeading}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                            <div className="row col-mb-50">
                                {homePageData.map((smartItem, index) => (
                                    smartItem.SectionPart?.length > 0 && smartItem.SectionPart.map((section, secIndex) => (
                                        section.SectionDesc?.length > 0 &&
                                        section.SectionDesc.sort((a, b) => (a.SortOrder || 0) - (b.SortOrder || 0))
                                            .map((eventItem, eventIndex) => {
                                                const { Title, Description } = eventItem;
                                                return (
                                                    <div key={eventIndex} className="col-sm-6 col-lg-4">
                                                        <div className="feature-box fbox-plain" data-animate="fadeIn">
                                                            <div className="fbox-icon">
                                                                <span className="fbox-text">{`0${eventIndex + 1}`}</span>
                                                            </div>
                                                            <div className="fbox-content">
                                                                <h3>
                                                                    <a href="h" target="_blank" rel="noopener noreferrer">
                                                                        {Title}
                                                                    </a>
                                                                </h3>
                                                                <ReadMoreContent content={Description} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    ))
                                ))}

                            </div>
                        </div>
                    </div>
                </section>
            )}
            {selectedType == 'CardGrid-2' && Title.toLowerCase() == 'blogdatagrid' && (
                <section
                    id="section-positions"
                    className="page-section section bg-transparent m-0"
                >
                    <div className="vertical-middle">
                        <div className="container clearfix">
                            <div className="heading-block center bottommargin-lg">
                                {homePageData.map((smartItem, index) => (
                                    smartItem.SectionPart?.length > 0 && (
                                        <div key={index}>
                                            {smartItem.SectionPart.map((section, secIndex) => (
                                                <div key={secIndex}>
                                                    <h2>{section.Title}</h2>
                                                    <span>{section.SubHeading}{" "}
                                                        <a href="mailto:recruiting@hochhuth-consulting.de">
                                                        </a>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                            <div className="clearfix">
                                <div className="row col-mb-50 mb-0">
                                    {homePageData.map((smartItem, index) => (
                                        smartItem.SectionPart?.length > 0 && smartItem.SectionPart.map((section, secIndex) => (
                                            section.SectionDesc?.length > 0 && section.SectionDesc.map((eventItem, eventIndex) => (
                                                <div
                                                    key={eventIndex}
                                                    className="col-sm-12 col-md-6 col-lg-6 d-flex"
                                                >
                                                    <div className="card-box d-flex flex-column">
                                                        <div className="card-box-body">
                                                            <div className="card-box-title">
                                                                <h3>{eventItem?.Title}</h3>
                                                            </div>
                                                            <div
                                                                className="card-box-desc"
                                                            ><ReadMoreContent content={eventItem?.Description} /></div>
                                                        </div>
                                                        <div className="card-box-actionBtn">
                                                            <Link
                                                                to={`/OpenPosition/${eventItem?.Title}`}
                                                                className="button button-border button-rounded button-fill fill-from-right button-blue"
                                                            >
                                                                <span>READ MORE</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ))
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
