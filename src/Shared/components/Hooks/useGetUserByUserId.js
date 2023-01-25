import { useState, useCallback } from 'react';

import { useHttpClient } from './http-hook';

export const useGetUserByUserId = () => {

    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
  

    const fetchUserByUserId = useCallback(async (token) => {
        setLoadedUser();

        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/users/getUserByUserId`,
                'POST',
                JSON.stringify({}),

                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token

                },
            )
          
            setLoadedUser(responseData.user)
          
           

        } catch (err) { }

    }, [sendRequest])




    return [isLoading, error, clearError, fetchUserByUserId, loadedUser]

}