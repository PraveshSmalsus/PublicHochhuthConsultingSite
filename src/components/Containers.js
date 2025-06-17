import React, { useEffect, useState } from 'react';

import HomePageSlider from './HomePageSlider';
import FullContainer from './FullContainer';
import DataGrid from './DataGrid';
import TeamCard from './TeamCard';
import BlogDataGrid from './BlogDataGrid';
import Vacancies from './Vacancies';
import ContactForm from '../pages/Contact';

export default function Containers(props) {
    const ContainerTitle = props.ContainerTitle
    const PageTitle = props.PageTitle
    const selectedType = props.selectedType;
    const Title = props.Title;
    return (
        <>
            {Title == 'DataGrid' && (<DataGrid
                ContainerTitle={ContainerTitle}
                PageTitle={PageTitle}
                Title={Title}
                selectedType={selectedType}
            />)
            }
            {
                Title == 'BlogDataGrid' && (<BlogDataGrid
                    ContainerTitle={ContainerTitle}
                    PageTitle={PageTitle}
                    Title={Title}
                    selectedType={selectedType}
                />)
            }
            {
                Title == 'FullContainer' && (<FullContainer
                    ContainerTitle={ContainerTitle}
                    PageTitle={PageTitle}
                    Title={Title}
                    selectedType={selectedType}
                    backgroundImageHeader={props?.backgroundImageHeader}
                />)
            }
            {
                Title == 'Slider' && (<HomePageSlider
                    ContainerTitle={ContainerTitle}
                    PageTitle={PageTitle}
                    Title={Title}
                    selectedType={selectedType}
                />)
            }
            {
                Title == 'TeamDataGrid' && (<TeamCard
                    ContainerTitle={ContainerTitle}
                    PageTitle={PageTitle}
                    Title={Title}
                    selectedType={selectedType}
                />)
            }

            {
                Title == 'Form' && (<ContactForm Type={"SmartPage"} />)
            }


        </>

    );
}
