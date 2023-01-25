import React, { useEffect } from 'react';
import { useFetchMyCreatedSubjects } from '../../../Shared/components/Hooks/useFetchMyCreatedSubjects';

import LoadingSpinner from '../../../Shared/components/UIComponents/LoadingSpinner';
import ErrorModal from '../../../Shared/components/UIComponents/ErrorModal';
import MyQuesAnsLists from '../components/MyQuesAnsLists.js';


const MyQuesAns = props => {
    const [isLoading, error, clearError, fetchCreatedSubjects, loadedCreatedSubjects] = useFetchMyCreatedSubjects();


    useEffect(() => {

        fetchCreatedSubjects()

    }, [fetchCreatedSubjects])




    return (
        <div className="my-select-show-modify-container">


            {isLoading && <LoadingSpinner asOverlay />}

            {error && <ErrorModal onClear={clearError} error={error} />}
           



            <MyQuesAnsLists
                subId={props.location.state !== null && props.location.state.subId}
                topicId={props.location.state !== null && props.location.state.topicId}
                unitId={props.location.state !== null && props.location.state.unitId}
                loadedCreatedSubjects={loadedCreatedSubjects}

            />

        </div>

    )


}

export default MyQuesAns;