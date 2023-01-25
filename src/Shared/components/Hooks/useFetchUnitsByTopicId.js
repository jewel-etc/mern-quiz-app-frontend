import { useState ,useCallback} from 'react';

import { useHttpClient } from './http-hook';

export const useFetchUnitsByTopicId = () => {
   
    const [unitIsLoading, unitError, sendRequest, unitClearError] = useHttpClient();
    const [fetchedUnits, setFetchedUnits] = useState();

    const fetchUnits = useCallback(async (topicId) => {
        setFetchedUnits()
       
        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/units/fetchUnitsByTopicId/${topicId}`,
                'GET',
               
            )
            
            setFetchedUnits(responseData.units)

        } catch (err) { }

    },[sendRequest])


    return [unitIsLoading, unitError, unitClearError, fetchUnits, fetchedUnits]

}