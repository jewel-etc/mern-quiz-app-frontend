import { useState, useContext ,useCallback} from 'react';
import { AuthContext } from '../Context/auth-context';

import { useHttpClient } from './http-hook';

export const useFetchMyCreatedQuesAns = () => {
    // let subId=""
    const auth = useContext(AuthContext)
    const [quesAnsIsLoading, quesAnsError, sendRequest, quesAnsClearError] = useHttpClient();
    const [loadedCreatedQuesAns, setLoadedCreatedQuesAns] = useState();




    const fetchCreatedQuesAns = useCallback(async (unitId) => {
        setLoadedCreatedQuesAns()
      
        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/quesAns/getQuesAnsByUnitId/${unitId}`,
                'POST',
                JSON.stringify({userId:auth.userId}),

                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                },
            )
            setLoadedCreatedQuesAns(responseData.quesAnswers)

        } catch (err) { }

    },[auth.userId, auth.token,sendRequest])


    return [quesAnsIsLoading, quesAnsError, quesAnsClearError, fetchCreatedQuesAns,loadedCreatedQuesAns]

}