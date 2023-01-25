import { useCallback, useContext, useState, useEffect } from 'react';

import { useHttpClient } from './http-hook';
import { AuthContext } from '../../../Shared/components/Context/auth-context.js';

export const useUpdateProfile = () => {

    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [alertMsg, setAlertMsg] = useState();
    const [updateMsg, setUpdateMsg] = useState();
    const auth = useContext(AuthContext);

    useEffect(() => {
        setTimeout(() => {
            setAlertMsg(false)
            setUpdateMsg()


        }, 1000)


    }, [updateMsg])
    const updateProfile = useCallback(async (name, username, password) => {
        const userData = JSON.parse(localStorage.getItem('userData'))

      

        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/users/updateProfileByUserId`,
                'PATCH',
                JSON.stringify({    //body

                    name,
                    username,
                    password

                }),

                {
                    'Content-Type': 'application/json', //headers
                    Authorization: 'Bearer ' + auth.token
                },

            )

            auth.login(auth.userId, responseData.existingUser.name, responseData.existingUser.username,
                auth.token, auth.isAdmin, responseData.existingUser.favSubjectsIds, auth.saveSubjectsIds, new Date(userData.expiration))
            setAlertMsg(true)
            setUpdateMsg(responseData.message)


        } catch (err) {
            setAlertMsg()
            setUpdateMsg()
        }


    }, [sendRequest, auth])



    return [isLoading, error, clearError, updateProfile, alertMsg, updateMsg]

}