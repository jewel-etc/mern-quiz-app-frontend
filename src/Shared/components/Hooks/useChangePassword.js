import { useCallback, useContext, useState, useEffect } from 'react';

import { useHttpClient } from './http-hook';
import { AuthContext } from '../Context/auth-context.js';

export const useChangePassword= () => {

    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [alertMsg, setAlertMsg] = useState();
    const [changeMsg, setChangeMsg] = useState();
    const auth = useContext(AuthContext);

    useEffect(() => {
        setTimeout(() => {
            setAlertMsg(false)
            setChangeMsg()


        }, 1000)


    }, [changeMsg])
    const updatePassword = useCallback(async (oldPassword, newPassword, confirmPassword) => {
        // const userData = JSON.parse(localStorage.getItem('userData'))



        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/users/changePasswordByUserId`,
                'PATCH',
                JSON.stringify({    //body

                    oldPassword,
                    newPassword,
                    confirmPassword

                }),

                {
                    'Content-Type': 'application/json', //headers
                    Authorization: 'Bearer ' + auth.token
                },

            )

            // auth.login(auth.userId, responseData.existingUser.name, responseData.existingUser.username,
            //     auth.token, auth.isAdmin, responseData.existingUser.favSubjectsIds, auth.saveSubjectsIds, new Date(userData.expiration))
            setAlertMsg(true)
            setChangeMsg(responseData.message)


        } catch (err) {
            setAlertMsg()
            setChangeMsg()
        }


    }, [sendRequest, auth])

    // return [favIsLoading, favError, favClearError, addFavIds]

    return [isLoading, error, clearError, updatePassword, alertMsg, changeMsg]

}