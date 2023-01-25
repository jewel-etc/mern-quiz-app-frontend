import { useState, useCallback, useContext } from 'react';
import { AuthContext } from '../../../Shared/components/Context/auth-context.js';

import { useHttpClient } from './http-hook';

export const useFetchMySaveSub = () => {
    const auth = useContext(AuthContext)
    const [isSaveSubLoading, saveSubError, sendRequest, saveSubClearError] = useHttpClient();
    const [loadedSavedSubjects, setLoadedSavedSubjects] = useState();

 
        const fetchSavedSubjects =  useCallback(async () => {
            setLoadedSavedSubjects()
            try {

                const responseData = await sendRequest(

                    `${process.env.REACT_APP_BACKEND_URL}/users/getSaveSubjectsByUserId/`,
                    'POST',
                    JSON.stringify({}),

                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    },
                )
               
                setLoadedSavedSubjects(responseData.saveSubjects)

            } catch (err) { }

        },[auth.token,sendRequest])

       
    

    return[isSaveSubLoading, saveSubError, saveSubClearError,fetchSavedSubjects, loadedSavedSubjects]

}