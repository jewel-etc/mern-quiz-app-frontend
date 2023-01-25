import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Shared/components/Context/auth-context.js';
import { useHttpClient } from '../../Shared/components/Hooks/http-hook.js';
import { useFetchMyFavSub } from '../../Shared/components/Hooks/useFetchMyFavSub.js';
import { useSaveMyFav } from '../../Shared/components/Hooks/useSaveMyFav.js'
import ErrorModal from '../../Shared/components/UIComponents/ErrorModal.js';
import Button from '../../Shared/components/FormElements/Button.js';
import Backdrop from '../../Shared/components/UIComponents/Backdrop.js';
import Auth from '../../User/pages/Auth.js';
import Stack from '@mui/material/Stack';
import LoadingSpinner from '../../Shared/components/UIComponents/LoadingSpinner.js';
import { AiFillDelete } from 'react-icons/ai';




import './MyFav.css';


const MyFav = props => {

    const [favSubIsLoading, favSubError, favSubClearError, fetchFavSubjects, loadedFavSubjects] = useFetchMyFavSub();
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [isSaveSubLoading, saveSubError, saveSubClearError, saveSub, openAuth, saveSubjects] = useSaveMyFav();
    const [deleteFavId, setDeleteFavId] = useState();
    const [authIsLoading, setAuthIsLoading] = useState();
    const auth = useContext(AuthContext);
    const history = useHistory();


    useEffect(() => {


        if (auth.token) {
            fetchFavSubjects(auth.userId, auth.token, auth.favSubjectsIds);
        }
        else {
            fetchFavSubjects(undefined, undefined, auth.favSubjectsIds)
        }

    }, [auth.userId, auth.token, auth.favSubjectsIds, fetchFavSubjects])

    let fetchError;

    if (favSubError) {
        fetchError = <ErrorModal onClear={favSubClearError} error={favSubError} />
    }

    if (error) {
        fetchError = <ErrorModal onClear={clearError} error={error} />
    }

    if (saveSubError) {

        fetchError = <ErrorModal onClear={saveSubClearError} error={saveSubError} />

    }

    const deleteFavSubject = (delFavId) => {
        setDeleteFavId(delFavId)
    }

    const cancelDeleteFavSubjectHandler = () => {
        setDeleteFavId()
    }



    const deleteFavSubjectHandler = async (deleteFavSubId) => {
        setDeleteFavId(deleteFavSubId)



        const userData = JSON.parse(localStorage.getItem('userData'))

        if (auth.token) {

            try {

                const responseData = await sendRequest(

                    `${process.env.REACT_APP_BACKEND_URL}/users/deleteFavSubjectByFavSubjectId`,
                    'DELETE',
                    JSON.stringify({
                        deleteFavSubId

                    }),

                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    },

                )

                auth.login(auth.userId, auth.name, auth.username, auth.token, auth.isAdmin,
                    responseData.favIds, auth.saveSubjectsIds, new Date(userData.expiration))
                setDeleteFavId()



            } catch (err) {
                setDeleteFavId()

            }

        } else {

            const favIds = userData.favIds.filter(fav => fav !== deleteFavSubId)
            auth.login(undefined, undefined, undefined, undefined, false, favIds, [], undefined)
            setDeleteFavId()
        }

    }



    const addFavHandler = () => {
        history.push("/home")
    }

    const saveFavSubjectsHandler = async () => {

        saveSubjects(openAuth, auth.favSubjectsIds);




    }

    const closeOpenAuthHandler = () => {
        saveSubjects(openAuth)
    }

    let sortedFavSubjects

    if (loadedFavSubjects) {

        sortedFavSubjects = loadedFavSubjects.sort((a, b) => (a.name > b.name) ? 1 : -1)

    }
    const handleAuthenticate = (isLoading) => {
        setAuthIsLoading(isLoading)

    }

    return (

        <>
            {fetchError}


            {
                (favSubIsLoading) &&
                <LoadingSpinner asOverlay />

            }

            <div className="fav-subjects-container">



                {
                    loadedFavSubjects && favSubIsLoading === false &&

                    <div className="my-fav-heading-container" >
                        {loadedFavSubjects.length > 0 ? 'My Favourites' : 'No Fav Subjects Added'}
                    </div>

                }


                {
                    loadedFavSubjects && loadedFavSubjects.length > 0 &&
                    <div
                        className="fav-subject-container">

                        {
                            sortedFavSubjects.map((fav, index) => {

                                return (
                                    <div
                                        key={fav.id}
                                        className={deleteFavId === fav.id ? 'fav-subject-delete' : 'fav-subject'}

                                        style={isLoading && fav.id === deleteFavId
                                            ? { backgroundColor: '#800E0E' }
                                            : index === loadedFavSubjects.length - 1 ? { borderBottom: 'none' } : {}}>

                                        <div
                                            className="fav-sub-name-container"
                                            style={isLoading && fav.id === deleteFavId
                                                ? { color: 'white' } : {}}>
                                            {fav.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                                        </div>

                                        <div className="delete-fav-btn-container" >

                                            {fav.id === deleteFavId

                                                ? isLoading

                                                    ? <Stack sx={{ color: 'red', fontWeight: 'bold', cursor: 'progress' }} spacing={2} direction="row">

                                                        DELETING....

                                                    </Stack>
                                                    :
                                                    <>
                                                        <p
                                                            style={{
                                                                fontSize: 'small',
                                                                marginTop: '0',
                                                                marginBottom: '0',
                                                                fontWeight: 'bold',
                                                                color: 'red',
                                                                marginRight: '20px',
                                                                cursor: 'pointer'
                                                            }}

                                                            onClick={() => { deleteFavSubjectHandler(fav.id) }}>
                                                            DELETE

                                                        </p>

                                                        <p
                                                            style={{
                                                                fontSize: 'small',
                                                                marginTop: '0',
                                                                marginBottom: '0',
                                                                fontWeight: 'bold',
                                                                cursor: 'pointer'
                                                            }}

                                                            onClick={() => { cancelDeleteFavSubjectHandler() }}>
                                                            CANCEL
                                                        </p>
                                                    </>
                                                :
                                                <div className="remove"
                                                    onClick={() => { deleteFavSubject(fav.id) }}>
                                                    <AiFillDelete />

                                                </div>
                                            }

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }


                {loadedFavSubjects &&
                    <div className="add-save-button-container " style={{ border: loadedFavSubjects.length === 0 && 'none' }}>

                        {
                            saveSub
                                ?
                                null

                                :
                                <>

                                    <Button
                                        onClick={addFavHandler}
                                        add={true}
                                        disabled={isLoading && deleteFavId && true}>
                                        ADD MORE SUBJECT

                                    </Button>


                                    {
                                        loadedFavSubjects.length > 0 &&
                                        <Button
                                            disabled={isLoading && deleteFavId && true}
                                            saveToPro={true}
                                            onClick={() => { saveFavSubjectsHandler() }} >
                                            SAVE TO PROFILE
                                        </Button>
                                    }
                                </>


                        }


                        {saveSub && isSaveSubLoading &&


                            <>
                                <Backdrop />
                                <div

                                    style={{
                                        color: 'green',
                                        fontWeight: 'bold',
                                        zIndex: '300',
                                        backgroundColor: 'white',
                                        padding: '15px',
                                        boxShadow: '1px 1px 1px 1px white',
                                        fontSize: 'medium',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                        margin: 'auto',
                                        position: 'absolute',
                                        width: 'fit-content',
                                        height: 'fit-content'


                                    }}>SAVING.....</div>
                            </>

                        }



                    </div>}


                {
                    openAuth &&
                    <>


                        {/* <Backdrop cancel={!authIsLoading ? closeOpenAuthHandler : undefined} /> */}
                        <Auth
                            save={true}
                            isLoggedIn={true}
                            authenticateHandler={handleAuthenticate}
                            authIsLoading={authIsLoading}
                            closeAuthHandler={closeOpenAuthHandler}
                            
                        />
                    </>

                }
            </div>
        </>
    )
}

export default MyFav;