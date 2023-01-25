import React, { useEffect } from 'react';
import { useFetchMyCreatedSubjects } from '../../../Shared/components/Hooks/useFetchMyCreatedSubjects';

import LoadingSpinner from '../../../Shared/components/UIComponents/LoadingSpinner';
import ErrorModal from '../../../Shared/components/UIComponents/ErrorModal';
import MyUnitsLists from '../components/MyUnitslists.js';




const MyUnits = props => {
    const [isLoading, error, clearError, fetchCreatedSubjects, loadedCreatedSubjects] = useFetchMyCreatedSubjects();


    useEffect(() => {

        fetchCreatedSubjects()

    }, [fetchCreatedSubjects])



    return (
        <div className="my-select-show-modify-container">

            {isLoading && <LoadingSpinner asOverlay  />}

            {error && <ErrorModal onClear={clearError} error={error} />}
      
            



            <MyUnitsLists
                subId={props.location.state !== null && props.location.state.subId}
                topicId={props.location.state !== null && props.location.state.topicId}
                loadedCreatedSubjects={loadedCreatedSubjects}

            />

        </div>

    )


}

export default MyUnits;