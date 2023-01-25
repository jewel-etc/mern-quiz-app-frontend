import  {  useState,useContext ,useCallback } from 'react';
import { AuthContext } from '../Context/auth-context';

import { useHttpClient } from './http-hook';

export const useFetchMyCreatedSubjects=()=>{
    const auth = useContext(AuthContext)
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [loadedCreatedSubjects, setLoadedCreatedSubjects] = useState();

 
        const fetchCreatedSubjects =  useCallback(async () => {
            setLoadedCreatedSubjects()
            try {

                const responseData = await sendRequest(

                    `${process.env.REACT_APP_BACKEND_URL}/subjects/getCreatedSubjectsByUserId/${auth.userId}`,
                    'POST',
                    JSON.stringify({}),

                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    },
                )
                setLoadedCreatedSubjects(responseData.subjects)

            } catch (err) { }

        },[auth.token,auth.userId,sendRequest])

       
    

    return[isLoading, error, clearError,fetchCreatedSubjects, loadedCreatedSubjects]
    
}