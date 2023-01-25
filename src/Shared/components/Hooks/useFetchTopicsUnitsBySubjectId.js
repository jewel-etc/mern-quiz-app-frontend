import { useState, useCallback } from 'react';


import { useHttpClient } from './http-hook';

export const useFetchTopicsUnitsBySubjectId = () => {
 
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [loadedTopics, setLoadedTopics] = useState();
    const [loadedUnits, setLoadedunits] = useState();


    const fetchTopicsUnits = useCallback(async (subId) => {
        setLoadedTopics();
        setLoadedunits();
        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/topics/getTopicsAndUnitsBySubjectId/${subId}`,
                'POST',
                JSON.stringify({ }),

                {
                    'Content-Type': 'application/json',
                    
                },
            )
          
            setLoadedTopics(responseData.topics)
            setLoadedunits(responseData.units)

        } catch (err) { }

    }, [ sendRequest])




    return [isLoading, error, clearError, fetchTopicsUnits, loadedTopics,loadedUnits]

}