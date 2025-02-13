import React, { useEffect, useState } from 'react';

import HomePageSlider from './HomePageSlider';
import FullContainer from './FullContainer';
import DataGrid from './DataGrid';
import TeamCard from './TeamCard';
import Vacancies from './Vacancies';

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
                Title == 'BlogDataGrid' && (<DataGrid
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
        </>

    );
}
