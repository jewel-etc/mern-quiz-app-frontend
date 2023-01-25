import React, { useState, useEffect, useContext, useCallback } from 'react';
import Input from '../../components/FormElements/Input.js';
import Button from '../../components/FormElements/Button.js';
import { useForm } from '../../components/Hooks/form-hook.js';
import { validate } from '../Utils/Validators.js';
import ErrorModal from '../UIComponents/ErrorModal.js';
import { AuthContext } from '../Context/auth-context.js';
import { useHttpClient } from '../Hooks/http-hook.js';
import './ShowAndModifyForm.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



// import './ShowUpdateDeleteForm.css';

const ShowUpdateDeleteForm = props => {

    const auth = useContext(AuthContext);
    const [validationError, setValidationError] = useState(undefined);
    const [isLoading, error, sendRequest, clearError] = useHttpClient();


    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);


    const [updateItem, setUpdateItem] = useState();
    const [updateMsg, setUpdateMsg] = useState();
    const [updateItemId, setUpdateItemId] = useState();

    const [deleteItem, setDeleteItem] = useState();
    const [deleteMsg, setDeleteMsg] = useState();
    const [deleteItemId, setDeleteItemId] = useState();

    const [alertMsg, setAlertMsg] = useState();
    const [optionAlert, setOptionAlert] = useState();

    const [inputState, changeHandler] = useForm({

        name: {
            value: props.name
        },
        description: {
            value: props.description
        },
        question: {
            value: props.question
        },
        option1: {
            value: props.option1
        },
        option2: {
            value: props.option2
        },
        option3: {
            value: props.option3
        },
        option4: {
            value: props.option4
        },
        correctOption: {
            value: props.correctOption
        },
        explanation: {
            value: props.explanation
        }

    });

    let inputForm = [];


    for (let key in inputState.inputs) {

        if (props.item === 'question' && key !== 'name') {
            inputForm.push(<Input
                key={key}
                element={key === 'description' || key === 'explanation' || key === 'question' ? 'textarea' : 'input'}
                rows={2}
                id={key}
                type="text"
                label={key === 'correctOption' ? 'Correct' : key}
                handleChange={(e) => { changeHandler(e, key) }}
                value={inputState.inputs[key].value}
                errorText={validationError && validationError[key]}
                disabled={props.itemId === updateItemId ? false : true}
            />)

        }

        else if (props.item !== 'question' && (key === 'name' || key === 'description')) {

            inputForm.push(<Input
                key={key}
                element={key === 'description' ? 'textarea' : 'input'}
                id={key}
                type="text"
                label={key}
                handleChange={(e) => { changeHandler(e, key) }}
                value={inputState.inputs[key].value}
                errorText={validationError && validationError[key]}
                capitalize={true}
                disabled={props.itemId === updateItemId ? false : true}
            />)
        }
    }



    useEffect(() => {
        setValidationError(validate(inputState, false, false, false, props.item))

    }, [inputState, props.item])

    let formIsValid = false;


    if (validationError && Object.keys(validationError).length === 0) {
        formIsValid = true

    } else {
        formIsValid = false
    }

    const showUpdateButtonHandler = (updateItemId) => {

        setUpdateItemId(updateItemId)
        setAlertMsg(true)

        setShowUpdateButton(prevState => !prevState)
        setShowDeleteButton(false)
    }

    const showDeleteButtonHandler = (deleteItemId) => {
        setDeleteItemId(deleteItemId)

        setShowDeleteButton(prevState => !prevState)
        setAlertMsg(true)
        setShowUpdateButton(false)
    }

    const cancelUpdateHandler = (e) => {
        e.preventDefault();
        setUpdateItemId()

        setShowUpdateButton(false)
        setAlertMsg()


    }

    const cancelDeleteHandler = (e) => {
        e.preventDefault();

        setShowDeleteButton(false)
        setAlertMsg()
        setDeleteItemId()

    }

    const updateItemHandler = async (e, updateId) => {

        e.preventDefault();

        if (props.item === 'question') {

            let options = [inputState.inputs.option1.value,
            inputState.inputs.option2.value,
            inputState.inputs.option3.value,
            inputState.inputs.option4.value];

            let rightOption = options.includes(inputState.inputs.correctOption.value)

            if (!rightOption) {
                // alert("correct option must be from one of the options")
                setOptionAlert("correct option must be from one of the options")
            }
            else {

                setShowUpdateButton(false)
                setUpdateItemId()
                setUpdateItem(true)
                setDeleteItem(false)
                props.disableAddButton(true)

                try {

                    const responseData = await sendRequest(

                        props.updateUrl,
                        props.updateMethod,

                        JSON.stringify({

                            description: inputState.inputs.description.value,
                            question: inputState.inputs.question.value,
                            option1: inputState.inputs.option1.value,
                            option2: inputState.inputs.option2.value,
                            option3: inputState.inputs.option3.value,
                            option4: inputState.inputs.option4.value,
                            correctOption: inputState.inputs.correctOption.value,
                            explanation: inputState.inputs.explanation.value,
                            updateItemId: updateId

                        }),

                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + auth.token
                        },

                    )

                    setUpdateItem(false);
                    setDeleteItem(true)
                    setUpdateMsg(responseData.message)
                    setAlertMsg(true)
                    // props.disableAddButton(false)
                    // setShowAndModifyContainer(true)

                } catch (err) {
                    setShowUpdateButton(false);
                    props.disableAddButton(false)
                }

            }


        } else {

            setShowUpdateButton(false)
            setUpdateItemId(updateId)
            setUpdateItem(true)
            setDeleteItem(false)
            props.disableAddButton(true)

            try {

                const responseData = await sendRequest(

                    props.updateUrl,
                    props.updateMethod,

                    JSON.stringify({
                        name: inputState.inputs.name.value,
                        description: inputState.inputs.description.value,
                        updateItemId: updateId

                    }),

                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    },

                )

                setUpdateItem(false);
                setDeleteItem(true)
                setUpdateMsg(responseData.message)
                setAlertMsg(true)
                setUpdateItemId()
                // props.disableAddButton(false)

            } catch (err) {
                setShowUpdateButton(true);
                props.disableAddButton(false)
            }

        }

    }

    const { disableAddButton } = props

    useEffect(() => {
        if (updateMsg) {
           

            setTimeout(() => {
                setAlertMsg(false)
                setUpdateMsg()
                disableAddButton(false)


            }, 500)

        }


    }, [updateMsg, disableAddButton])


    const deleteItemHandler = async (e, deleteId) => {
        e.preventDefault();
        setShowDeleteButton(false);
        setDeleteItem(true)
        setUpdateItem(false)
        props.disableAddButton(true)

        const userData = JSON.parse(localStorage.getItem('userData'))
        let favIds = userData.favIds.filter(fav => fav !== deleteId)
       
        let saveIds = userData.saveIds.filter(save => save !== deleteId)


        try {

            const responseData = await sendRequest(

                props.deleteUrl,
                props.deleteMethod,

                JSON.stringify({
                    deleteItemId: deleteId

                }),

                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                },

            )
            setDeleteItem(false);
            setUpdateItem(true)
            setDeleteMsg(responseData.message)
            setAlertMsg(true)
            setDeleteItemId(deleteId)            
            auth.login(auth.userId, auth.name, auth.username,
                auth.token, auth.isAdmin, favIds, saveIds,
                new Date(userData.expiration))

        } catch (err) {
            setShowDeleteButton(true);
            props.disableAddButton(false)
        }

    }

    const { handleShowItemAfterDelete } = props

    const showItemsAfterDeletion = useCallback(() => {
        handleShowItemAfterDelete(deleteItemId)
        // disableAddButton(false)

    }, [deleteItemId, handleShowItemAfterDelete])

    useEffect(() => {

        if (deleteMsg) {
            setTimeout(() => {
                setAlertMsg(false)
                setDeleteMsg()
                showItemsAfterDeletion()
                disableAddButton(false)


            }, 500)

        }

    }, [deleteMsg, showItemsAfterDeletion, disableAddButton])

    const closeOptionMsgHandler = () => {
        setOptionAlert()
    }



    return (
        <>
            {error && <ErrorModal onClear={clearError} error={error} />}

            <form
                className="show-and-modify-form-container"
                style={updateItemId === props.itemId ? { borderColor: 'orange', boxShadow: '0 0 10px orange' }
                    : deleteItemId === props.itemId ? { borderColor: 'red', boxShadow: '0 0 10px red' } : {}}
                key={props.itemId}>


                <div className="show-and-modify-form-heading-container" >

                    <div className="show-and-modify-form-heading" style={{ textTransform: 'capitalize' }}>
                        {props.item} :   {props.itemNo + 1}
                    </div>



                    <div className="show-and-modify-container" >


                        {(showUpdateButton || showDeleteButton || alertMsg || updateMsg || deleteMsg)
                            ?
                            null
                            :
                            <>

                                {props.addItem && <div className="add-tooltip-text" onClick={() => props.handleAddItem(props.itemId)}>
                                    Add {props.addItem}

                                </div>}

                                <div className="edit-tooltip-text" onClick={() => showUpdateButtonHandler(props.itemId)} >
                                    Edit
                                </div>



                                <div className="delete-tooltip-text" onClick={() => showDeleteButtonHandler(props.itemId)}>
                                    Delete
                                </div>
                            </>

                        }
                    </div>


                </div>
                {inputForm}

                <div className="modify-button-container">

                    {
                        showUpdateButton && optionAlert === undefined &&
                        <>

                            <Button
                                // style={{ margin: '0', padding: '5px', fontSize: 'x-small', marginRight: '10px' }}
                                update={true}
                                disabled={!formIsValid}
                                onClick={(e) => updateItemHandler(e, props.itemId)} >
                                UPDATE
                            </Button>

                            <Button

                                cancel={true}
                                disabled={!formIsValid}
                                onClick={(e) => { cancelUpdateHandler(e) }}>
                                CANCEL
                            </Button>

                        </>
                    }
                    {
                        optionAlert &&
                        <Stack sx={{ width: '100%', height: 'auto', padding: '0' }} spacing={2}>
                            <Alert onClose={closeOptionMsgHandler} severity="error"
                                style={{ paddingTop: 0, paddingBottom: 0 }}>


                                {optionAlert}
                            </Alert>
                        </Stack>
                    }

                    {
                        alertMsg && updateMsg &&
                        <Stack sx={{ width: '100%', margin: '10px' }} spacing={2}>
                            <Alert variant="filled" severity="success"
                                style={{ paddingTop: 0, paddingBottom: 0 }}>


                                {updateMsg}
                            </Alert>
                        </Stack>
                    }

                    {
                        isLoading && updateItem && !deleteItem &&
                        <>


                            <Stack sx={{ width: '100%', margin: '10px' }} spacing={2}>
                                <Alert variant="filled" severity="warning"
                                    style={{ paddingTop: 0, paddingBottom: 0 }}>

                                    Updating please wait....
                                </Alert>
                            </Stack>

                        </>

                    }

                    {
                        showDeleteButton &&
                        <>

                            <Button
                                style={{ margin: '0', padding: '5px', fontSize: 'x-small', marginRight: '10px' }}
                                danger={true}
                                disabled={!formIsValid}
                                onClick={(e) => deleteItemHandler(e, props.itemId)}>
                                DELETE
                            </Button>

                            <Button
                                // style={{ margin: '0', padding: '5px', fontSize: 'x-small',backgroundColor:'white',color:'black' }}
                                cancel={true}
                                disabled={!formIsValid}
                                onClick={(e) => cancelDeleteHandler(e)}>
                                CANCEL
                            </Button>
                        </>}


                    {
                        alertMsg && deleteMsg &&
                        <Stack sx={{ width: '100%', margin: '10px' }} spacing={2}>
                            <Alert variant="filled" severity="error"
                                style={{ paddingTop: 0, paddingBottom: 0 }}>

                                {deleteMsg}
                            </Alert>
                        </Stack>
                    }


                    {
                        isLoading && deleteItem && !updateItem &&
                        <Stack sx={{ width: '100%', margin: '10px' }} spacing={2}>
                            <Alert variant="filled" severity="error"
                                style={{ paddingTop: 0, paddingBottom: 0 }}>

                                Deleting please wait...
                            </Alert>
                        </Stack>

                    }


                </div>

            </form>
        </>
    )


}

export default ShowUpdateDeleteForm;