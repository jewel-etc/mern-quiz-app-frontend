import { useState, useCallback } from 'react';

import { useHttpClient } from './http-hook';

export const useFetchAllSubjects = () => {

    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [loadedAllSubjects, setLoadedAllSubjects] = useState();


    const fetchAllSubjects = useCallback(async () => {
        setLoadedAllSubjects()
        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/subjects/`,
                'GET',
                

            )
            setLoadedAllSubjects(responseData.subjects)

        } catch (err) { console.log(err) }

    }, [sendRequest])




    return [isLoading, error, clearError, fetchAllSubjects, loadedAllSubjects]

}