import { useState, useContext ,useCallback} from 'react';
import { AuthContext } from '../Context/auth-context';

import { useHttpClient } from './http-hook';

export const useFetchMyCreatedUnits = () => {
    // let subId=""
    const auth = useContext(AuthContext)
    const [unitIsLoading, unitError, sendRequest, unitClearError] = useHttpClient();
    const [loadedCreatedUnits, setLoadedCreatedUnits] = useState();




    const fetchCreatedUnits = useCallback(async (topicId) => {
        setLoadedCreatedUnits()
        
        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/units/getUnitsByTopicId/${topicId}`,
                'POST',
                JSON.stringify({}),

                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                },
            )
            
            setLoadedCreatedUnits(responseData.units)

        } catch (err) { }

    },[auth.token,sendRequest])


    return [unitIsLoading, unitError, unitClearError, fetchCreatedUnits, loadedCreatedUnits]

}