import { useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/auth-context.js';
import { useHttpClient } from './http-hook';
export const useSaveMyFav = () => {

    const auth = useContext(AuthContext);
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
  
    const [saveSub, setSaveSub] = useState();
    const [openAuth, setOpenAuth] = useState(false);
    const history = useHistory();


    const saveSubjects = useCallback(async (openAuth,favSubIds) => {
      


        if (openAuth) {
            setOpenAuth(false)
        }
        else if (auth.token) {
            setSaveSub(true)
            try {

                const responseData = await sendRequest(

                    `${process.env.REACT_APP_BACKEND_URL}/users/addSaveSubjectsByUserId/`,
                    'POST',
                    JSON.stringify({
                        favSave: 'save',
                        newSaveSubjectsIds: favSubIds,
                        newFavSubjectsIds: favSubIds,
                      

                    }),

                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    },

                )
               
                setSaveSub()
             
                
                const userData = JSON.parse(localStorage.getItem('userData'));

                auth.login(auth.userId, auth.name, auth.username, auth.token, auth.isAdmin, responseData.favSubjectsIds, responseData.saveSubjectsIds, new Date(userData.expiration))
                history.push("/myLearning")


            } catch (err) { 
                setSaveSub()
           }
        }

        else {

            setOpenAuth(true)

        }


    }, [sendRequest, auth, history])




    return [isLoading, error, clearError, saveSub, openAuth, saveSubjects]

}