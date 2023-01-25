import React, { useState } from 'react';
import HomeSubjectDetails from './HomeSubjectDetails.js';
import SwiperSlides from '../../Shared/components/UIComponents/SwiperSlides.js';




const HomeSubjectsLists = props => {

    const [subId, setSubId] = useState();
    const [subName, setSubName] = useState();
    const [favIsLoading, setFavIsLoading] = useState(false);


    const openSubjectDetailsHandler = (id, name) => {
       

        setSubId(id);
        setSubName(name)

    }

    const closeSubjectDetailsHandler = () => {
        if (!favIsLoading)
            setSubId()


    }

    const favLoadingHandler = (favLoading) => {
        setFavIsLoading(favLoading)
    }
    return (
        <>

            {props.loadedAllSubjects &&

                <SwiperSlides
                    loadedItems={props.loadedAllSubjects}
                    handleItemDetails={openSubjectDetailsHandler} />
            }

            {
                (subId || favIsLoading === true) &&

                <>
                  

                    <HomeSubjectDetails
                        subId={subId}
                        subName={subName}
                        handleFavLoading={favLoadingHandler}
                        cancel={closeSubjectDetailsHandler}
                    />


                </>
            }
        </>
    )
}

export default HomeSubjectsLists;