import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Shared/components/Context/auth-context.js';
import { useFetchMySaveSub } from '../../Shared/components/Hooks/useFetchMySaveSub.js';
import Stack from '@mui/material/Stack';
import ErrorModal from '../../Shared/components/UIComponents/ErrorModal.js';
import Button from '../../Shared/components/FormElements/Button.js';
import { useHttpClient } from '../../Shared/components/Hooks/http-hook.js';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import LoadingSpinner from '../../Shared/components/UIComponents/LoadingSpinner.js';

import './MyLearning.css'

const MyLearning = props => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [isSaveSubLoading, saveSubError, saveSubClearError, fetchSavedSubjects, loadedSavedSubjects] = useFetchMySaveSub();
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [removeId, setRemoveId] = useState();
    const [deleteSaveSubId, setDeleteSaveSubId] = useState();
    const [deleteConfirmId, setDeleteConfirmId] = useState();
    const [showRemove, setShowRemove] = useState();


    useEffect(() => {
        fetchSavedSubjects()
    }, [fetchSavedSubjects])



    const getTopicsUnitsHandler = (subId) => {

        history.push("/getTopics", {
            subId,

        })
    }

    const showRemoveSaveSubjcetContainerHandler = (subId) => {
        setDeleteSaveSubId()


        setRemoveId(subId)
        if (removeId === subId && showRemove) {
            setShowRemove(false)
        } else {
            setShowRemove(true)
        }

    }

    const removeSaveSubject = (deleteSaveSubId) => {
        setRemoveId()
        setShowRemove()
        setDeleteSaveSubId(deleteSaveSubId)

    }

    const confirmRemoveSaveSubjectHandler = async (deleteSaveSubId) => {


        setRemoveId()
        setDeleteConfirmId(deleteSaveSubId);
        const userData = JSON.parse(localStorage.getItem('userData'))

        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/users/deleteSaveSubjectBySaveSubjectId`,
                'DELETE',
                JSON.stringify({
                    deleteSaveSubId

                }),

                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                },

            )

            auth.login(auth.userId, auth.name, auth.username, auth.token, auth.isAdmin,
                auth.favSubjectsIds, responseData.saveIds, new Date(userData.expiration))
            fetchSavedSubjects()


        } catch (err) { }

    }

    const cancelRemoveSubject = () => {
        setDeleteSaveSubId()
        setDeleteConfirmId()

    }

    const addSubjectHandler=()=>{


        history.push("/")

    }

    return (

        <div className="saved-subjects-container">
            {
                isSaveSubLoading && <LoadingSpinner asOverlay />
            }
            {
                saveSubError && <ErrorModal onClear={saveSubClearError} error={saveSubError} />
            }
            {
                error && <ErrorModal onClear={clearError} error={error} />

            }


            {
                loadedSavedSubjects && loadedSavedSubjects.length === 0 &&
                <div className="no-subject-add-subject-container">
                    <div className="no-subject-container" style={{ textAlign: 'center' }}>
                        No Subject Added
                    </div>
                    <div className="add-subject-container">
                        <Button onClick={addSubjectHandler}>ADD SUBJECT</Button>
                    </div>

                </div>
            }

            {
                loadedSavedSubjects && loadedSavedSubjects.length > 0 && isSaveSubLoading === false &&
                <div className="my-saved-subjects-conatiner">


                    <div className="my-save-heading-container">
                        My Learning......
                    </div>


                    {
                        loadedSavedSubjects.map(sub => {
                            return (
                                <div className="my-saved-subject"

                                    key={sub.id}
                                    style={sub.id === deleteSaveSubId ? { borderColor: 'red', boxShadow: '0 0 10px red' } : {}}>
                                    <div
                                        className="saved-subject-name-container"
                                        style={sub.id === deleteConfirmId || sub.id === deleteSaveSubId
                                            ? { backgroundColor: '#800E0E' }
                                            : {}}>

                                        <div className="save-sub-name" >
                                            <div>{sub.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</div>
                                            {deleteSaveSubId === sub.id ? null :
                                                <div className="dot-container" onClick={() => { showRemoveSaveSubjcetContainerHandler(sub.id) }}>
                                                    <BiDotsVerticalRounded />
                                                </div>
                                            }

                                        </div>

                                        {sub.id === removeId && showRemove &&
                                            <div className="remove-save-subject-container"

                                                onClick={() => { removeSaveSubject(sub.id) }}>
                                                Remove
                                            </div>
                                        }


                                    </div>



                                    <div className="saved-subject-button-container" >

                                        {
                                            isLoading && sub.id === deleteConfirmId
                                                ?

                                                <Stack sx={{ color: 'red', margin: '10px', fontWeight: 'bold', cursor: 'progress' }} spacing={2} direction="row">

                                                    DELETING......
                                                </Stack>
                                                :
                                                <>

                                                    {
                                                        deleteSaveSubId === sub.id
                                                            ?

                                                            <>
                                                                <p
                                                                    style=
                                                                    {{
                                                                        fontSize: 'small',
                                                                        color: 'red',
                                                                        fontWeight: 'bolder',
                                                                        marginRight: '20px',
                                                                        cursor: 'pointer'
                                                                    }}

                                                                    onClick={() => { confirmRemoveSaveSubjectHandler(sub.id) }}>
                                                                    DELETE
                                                                </p>
                                                                <p
                                                                    style={{
                                                                        fontSize: 'small',
                                                                        color: 'black',
                                                                        fontWeight: 'bold',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                    onClick={() => { cancelRemoveSubject() }}>
                                                                    CANCEL
                                                                </p>
                                                            </>
                                                            :

                                                            <Button
                                                                style={{ fontSize: 'small' }}
                                                                enter={true}
                                                                onClick={() => { getTopicsUnitsHandler(sub.id) }}>
                                                                ENTER
                                                            </Button>
                                                    }
                                                </>
                                        }

                                    </div>

                                </div>
                            )
                        })
                    }



                </div>


            }

        </div>
    )
}

export default MyLearning;