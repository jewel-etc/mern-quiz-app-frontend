import { useCallback, useContext } from 'react';

import { useHttpClient } from './http-hook';
import { AuthContext } from '../../../Shared/components/Context/auth-context.js';

export const useAddFavIdsToUser = () => {

    const [favIsLoading, favError, sendRequest, favClearError] = useHttpClient();
  
    const auth = useContext(AuthContext);
    const addFavIds = useCallback(async (favId) => {


        if (auth.isLoggedIn) {
            const userData = JSON.parse(localStorage.getItem('userData'))
            try {

                const responseData = await sendRequest(

                    `${process.env.REACT_APP_BACKEND_URL}/users/addFavSubjectsByUserId`,
                    'POST',
                    JSON.stringify({    //body

                        newFavSubjectsIds: [favId],
                        userId: auth.userId,

                    }),

                    {
                        'Content-Type': 'application/json', //headers
                        Authorization: 'Bearer ' + auth.token
                    },

                )
             

                auth.login(auth.userId, responseData.existingUser.name, responseData.existingUser.username,
                    auth.token, auth.isAdmin, responseData.existingUser.favSubjectsIds, responseData.existingUser.saveSubjectsIds,
                    new Date(userData.expiration))


            } catch (err) {  }

        } else {
            auth.login(null, null, null, null, false, favId, [], undefined)

        }


    }, [sendRequest, auth])




    return [favIsLoading, favError, favClearError, addFavIds]

}