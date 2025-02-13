import React, { useEffect, useState } from 'react';
import { getPublicServerData } from '../Service/GetDataApi';
import * as CommonFunctions from '../Service/CommonFunctions';
import Containers from './Containers';

let smartMetaDataItem = [];
let containerListData = [];
let eventListData = [];
let SmartPageContainerData = [];

const ReadMoreContent = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const characterLimit = 200;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const shortContent = content.length > characterLimit ? content.slice(0, characterLimit) : content;
  useEffect(() => {
    if (content.length > characterLimit) {
      setShowReadMore(true);
    }
  }, [content]);

  return (
    <div className='text-justify'>
      <div
        dangerouslySetInnerHTML={{
          __html: isExpanded ? content : shortContent + (showReadMore ? '...' : ''),
        }}
      />
      {showReadMore && (
        <span onClick={toggleReadMore} className="read-more-button btn-link" style={{ cursor: 'pointer' }}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </span>
      )}
    </div>
  );
};

export default function SmartPageContainer(props) {
  const PageTitle = props.PageTitle;
  const [smartPageContainerData, setSmartPageContainer] = useState([]);

  useEffect(() => {
    GetAllSmartMetaData('SmartMetaData');
  }, []);

  const GetAllSmartMetaData = async (tableName) => {
    const smartdata = await getPublicServerData(tableName);
    smartMetaDataItem = await Promise.all(
      smartdata.map(async (item) => {
        item.SectionPart = [];
        item.PageContainers = await CommonFunctions.parseJson(item.PageContainers);
        if (item.Title.toLowerCase() == PageTitle.toLowerCase()) {
          return item;  // Return the item if it matches
        }
        return null;  // Return null if it doesn't match
      })
    );
    SmartPageContainerData = smartMetaDataItem.filter(item => item !== null);
    GetAllContainerListData('ContainerList');
    console.log(smartMetaDataItem);
  };

  const GetAllContainerListData = async (tableName) => {
    const containerdata = await getPublicServerData(tableName);
    containerListData = await Promise.all(
      containerdata.map(async (item) => {
        item.AdditionalContentSource = await CommonFunctions.parseJson(item.AdditionalContentSource);
        item.TeamInformation = await CommonFunctions.parseJson(item.TeamInformation);
        item.TemplateConfiguration = await CommonFunctions.parseJson(item.TemplateConfiguration);
        item.ComponentConfiguration = await CommonFunctions.parseJson(item.ComponentConfiguration);
        return item;
      })
    );

    // Mapping container data to corresponding smartItem SectionPart
    SmartPageContainerData.map((smartItem) => {
      if (smartItem.PageContainers?.length > 0) {
        smartItem.PageContainers.forEach((pageItem) => {
          containerdata.forEach((containerItem) => {
            if (containerItem.id == pageItem.Id) {
              smartItem.SectionPart.push(containerItem);
            }
          });
        });
      }
    });

    console.log(containerListData);
    setSmartPageContainer(SmartPageContainerData); // Update the state to trigger re-render
  };

  return (
    <section id="content">
      <div className="content-wrap py-0">
        {/* Safeguard to prevent errors if `SmartPageContainerData` or `SectionPart` is undefined */}
        {smartPageContainerData?.length > 0 && smartPageContainerData.map((smartItem, index) => (
          smartItem?.SectionPart?.length > 0 && (
            <div key={index}>
              {smartItem.SectionPart
                .sort((a, b) => a.SortOrder - b.SortOrder) // Optionally sort each SectionPart by SortOrder if it has one
                .map((section, secIndex) => (
                  section?.TemplateConfiguration && (
                    <div key={secIndex}>
                      <Containers
                        ContainerTitle={section.Title}
                        PageTitle={PageTitle}
                        Title={section?.TemplateConfiguration.Title}
                        selectedType={section?.TemplateConfiguration.selectedType}
                      />
                    </div>
                  )
                ))}
            </div>
          )
        ))}
      </div>
    </section>
  );
}
