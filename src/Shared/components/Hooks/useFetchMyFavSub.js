import { useState, useCallback } from 'react';


import { useHttpClient } from './http-hook';

export const useFetchMyFavSub = () => {
 

    const [favSubIsLoading, favSubError, sendRequest, favSubClearError] = useHttpClient();
    const [loadedFavSubjects, setLoadedFavSubjects] = useState();

    const fetchFavSubjects = useCallback(async (userId, token, favIds) => {
        setLoadedFavSubjects()
      
        let url, body,header;
        if (userId && token) {
            url = `${process.env.REACT_APP_BACKEND_URL}/users/getFavSubjectsByUserId/`;
            body = JSON.stringify({ userId: userId })
            header = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }

        } else {
            url = `${process.env.REACT_APP_BACKEND_URL}/users/getFavSubjectsByFavIds/`;
            body = JSON.stringify({ favIds })
            header = {
                'Content-Type': 'application/json',

            }

        }
      
        try {

            const responseData = await sendRequest(

                url,
                'POST',
                body,
                header
            )

            setLoadedFavSubjects(responseData.favSubjects)

        } catch (err) { }

    }, [sendRequest])


    return [favSubIsLoading, favSubError, favSubClearError, fetchFavSubjects, loadedFavSubjects]

}