import React from 'react';
import LoadingSpinner from '../../../Shared/components/UIComponents/LoadingSpinner.js';
import ErrorModal from '../../../Shared/components/UIComponents/ErrorModal.js';
import { useFetchMyCreatedSubjects } from '../../../Shared/components/Hooks/useFetchMyCreatedSubjects.js';
import MySubjectsLists from '../components/MySubjectsLists.js';



import { useEffect } from 'react';

const MySubjects = props => {

    const [isLoading, error, clearError, fetchCreatedSubjects, loadedCreatedSubjects] = useFetchMyCreatedSubjects();

    useEffect(() => {
        fetchCreatedSubjects()

    }, [fetchCreatedSubjects])

    const showAddedSubHandler = () => {

        fetchCreatedSubjects()

    }

    const showSubAfterDeleteHandler = () => {
        fetchCreatedSubjects()

    } 

    

    return (
        <>
            {isLoading && <LoadingSpinner asOverlay />}


            {error && <ErrorModal onClear={clearError} error={error} />}


            {loadedCreatedSubjects && <MySubjectsLists

                loadedCreatedSubjects={loadedCreatedSubjects.sort((a, b) => (a.name > b.name) ? 1 : -1)}
                handleShowAddedItem={showAddedSubHandler}
                handleShowItemAfterDelete={showSubAfterDeleteHandler}


            />}
        </>
    )


}

export default MySubjects;