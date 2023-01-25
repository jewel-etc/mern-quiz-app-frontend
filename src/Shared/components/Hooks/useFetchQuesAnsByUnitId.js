import { useState, useCallback,useContext } from 'react';
import {AuthContext} from '../../../Shared/components/Context/auth-context.js';


import { useHttpClient } from './http-hook';

export const useFetchQuesAnsByUnitId = () => {
 
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [loadedQuesAns, setLoadedQuesAns] = useState();
    const auth=useContext(AuthContext);   


    const fetchQuesAns = useCallback(async (unitId) => {
        setLoadedQuesAns();
        
        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/quesAns/getQuesAnsByUnitId/${unitId}`,
                'POST',
                JSON.stringify({userId:auth.userId }),

                {
                    'Content-Type': 'application/json',                   
                    
                },
            )
            
            setLoadedQuesAns(responseData.quesAnswers)
            

        } catch (err) { }

    }, [ sendRequest,auth.userId])




    return [isLoading, error, clearError, fetchQuesAns, loadedQuesAns]

}