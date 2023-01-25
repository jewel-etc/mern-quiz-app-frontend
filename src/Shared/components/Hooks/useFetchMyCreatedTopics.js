import { useState, useCallback } from 'react';


import { useHttpClient } from './http-hook';

export const useFetchMyCreatedTopics = () => {
    // let subId=""

    const [topicIsLoading, topicError, sendRequest, topicClearError] = useHttpClient();
    const [loadedCreatedTopics, setLoadedCreatedTopics] = useState();

    const fetchCreatedTopics = useCallback(async (subId) => {
        setLoadedCreatedTopics()
       
      
        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/topics/getTopicsAndUnitsBySubjectId/${subId}`,
                'POST',
                JSON.stringify({}),

                {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + auth.token
                },
            )
            setLoadedCreatedTopics(responseData.topics)
         

        } catch (err) {  }

    }, [sendRequest])


    return [topicIsLoading, topicError, topicClearError, fetchCreatedTopics, loadedCreatedTopics]

}