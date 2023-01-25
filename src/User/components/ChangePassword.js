import React, { useContext, useEffect, useState } from 'react';
import { useChangePassword } from '../../Shared/components/Hooks/useChangePassword.js';
import { useForm } from '../../Shared/components/Hooks/form-hook';
import { validate } from '../../Shared/components/Utils/Validators';
import Input from '../../Shared/components/FormElements/Input.js';
import Button from '../../Shared/components/FormElements/Button.js';
import { AuthContext } from '../../Shared/components/Context/auth-context';
import ErrorModal from '../../Shared/components/UIComponents/ErrorModal';
import Modal from '../../Shared/components/UIComponents/Modal';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './ViewProfile.css';

const ViewProfile = (props) => {
    const auth = useContext(AuthContext);
    const [validationError, setValidationError] = useState(undefined);
    const [openPasswordWindow, setOpenPasswordWindow] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [isLoading, error, clearError, changePassword, alertMsg, changeMsg] = useChangePassword();


    const [inputState, changeHandler] = useForm({

        oldPassword: {
            value: ''
        },
        newPassword: {
            value: ''
        },
        confirmPassword: {
            value: ''
        }


    });


    useEffect(() => {
        setValidationError(validate(inputState, auth.isLoggedIn, auth.isAdmin, auth.token, false))

    }, [inputState, auth.isLoggedIn, auth.isAdmin, auth.token])

    let newPasswordFormIsValid = false;

    let oldPasswordFormIsValid = false;




    if (validationError && (validationError.newPassword || validationError.confirmPassword)) {

        if (validationError.confirmPassword === "New & Confirm password matched") {
            newPasswordFormIsValid = true

        } else {
            newPasswordFormIsValid = false
        }

    }


    else {
        newPasswordFormIsValid = true
    }



    if (validationError && (validationError.oldPassword)) {
        oldPasswordFormIsValid = false
    } else {
        oldPasswordFormIsValid = true
    }


    const openPasswordWindowHandler = () => {
        setOpenPasswordWindow(true)
    }

    const closePasswordWindowHandler = () => {
        setOpenPasswordWindow(false)
    }

    const showPasswordHandler = (displayPassword) => {
        if (displayPassword === 'newPassword') {
            setShowNewPassword(prevState => !prevState)

        }
        if (displayPassword === 'confirmPassword') {
            setShowConfirmPassword(prevState => !prevState)

        }
        if (displayPassword === 'oldPassword') {
            setShowOldPassword(prevState => !prevState)

        }


    }
    const changePasswordHandler = () => {
        setOpenPasswordWindow(false)
        changePassword(
            inputState.inputs.oldPassword.value,
            inputState.inputs.newPassword.value,
            inputState.inputs.confirmPassword.value)
    }


    return (

        <div className="change-password-container">
            {error && <ErrorModal onClear={clearError} error={error} />}


            <div className="change-password-heading-container">
                <div className="change-password-heading">
                    Change Password
                </div>
            </div>
            <div className="view-change-password-container">

                <Input
                    element="input"
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    label="New Password"
                    handleChange={(e) => { changeHandler(e, "newPassword") }}
                    disabled={isLoading ? true : false}
                    value={inputState.inputs.newPassword.value}
                    errorText={validationError && validationError.newPassword}
                    showPasswordHandler={() => { showPasswordHandler('newPassword') }}
                   
                />

                <Input
                    element="input"
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    handleChange={(e) => { changeHandler(e, "confirmPassword") }}
                    value={inputState.inputs.confirmPassword.value}
                    disabled={isLoading ? true : false}
                 
                    errorText={validationError && validationError.confirmPassword}
                    showPasswordHandler={() => { showPasswordHandler('confirmPassword') }}
                />
            </div>
            <div className="change-password-button-container">
                {
                    isLoading
                        ?

                        <Stack sx={{ width: '100%',marginRight:'10px',marginLeft:'10px' }}  spacing={2}>
                            <Alert variant="filled" severity="warning"
                                >

                                Updating please wait...
                            </Alert>
                        </Stack>

                        : isLoading === false && alertMsg
                            ? <Stack sx={{ width: '100%',marginRight:'10px',marginLeft:'10px' }} spacing={2}>
                                <Alert variant="filled" severity="success"
                                  >

                                    {changeMsg}
                                </Alert>
                            </Stack>
                            :
                            <Button disabled={!newPasswordFormIsValid} onClick={openPasswordWindowHandler}>CHANGE</Button>

                }

            </div>

            <div>

                <Modal
                    onCancel={closePasswordWindowHandler}
                    header="Authenticate"
                    show={openPasswordWindow}
                    footer={<Button
                        disabled={!oldPasswordFormIsValid}
                        onClick={changePasswordHandler} >
                        CONTINUE
                    </Button>}
                >

                    <div>
                        <Input
                            element="input"
                            id="oldPassword"
                            type={showOldPassword ? 'text' : 'password'}
                            label="Old Password"
                            handleChange={(e) => { changeHandler(e, "oldPassword") }}
                            value={inputState.inputs.oldPassword.value}
                            errorText={validationError && validationError.oldPassword}
                            autofocus={true}
                            showPasswordHandler={() => { showPasswordHandler('oldPassword') }}
                        />

                    </div>
                </Modal>


            </div>

        </div>

    )
}

export default ViewProfile;