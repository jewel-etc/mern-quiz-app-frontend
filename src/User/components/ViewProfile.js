import React, { useContext, useEffect, useState } from 'react';
import { useUpdateProfile } from '../../Shared/components/Hooks/useUpdateProfile';
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
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, error, clearError, updateProfile, alertMsg, updateMsg] = useUpdateProfile();


    const [inputState, changeHandler] = useForm({

        name: {
            value: auth.name
        },
        username: {
            value: auth.username
        },
        password: {
            value: ''
        }


    });


    useEffect(() => {
        setValidationError(validate(inputState, auth.isLoggedIn, auth.isAdmin, auth.token, false))

    }, [inputState, auth.isLoggedIn, auth.isAdmin, auth.token])

    let formIsValid = false;

    let passwordFormIsValid = false;


    if (validationError && (validationError.name || validationError.username)) {
        formIsValid = false

    } else {
        formIsValid = true
    }

    if (validationError && validationError.password) {
        passwordFormIsValid = false
    } else {
        passwordFormIsValid = true
    }

    const openPasswordWindowHandler = () => {
        setOpenPasswordWindow(true)
    }

    const closePasswordWindowHandler = () => {
        setOpenPasswordWindow(false)
    }

    const showPasswordHandler = () => {
        setShowPassword(prevState => !prevState);

    }
    const updateProfileHandler = (e) => {
        e.preventDefault();
        setOpenPasswordWindow(false)
        updateProfile(inputState.inputs.name.value, inputState.inputs.username.value, inputState.inputs.password.value)
    }


    return (

        <div className="profile-container"  >
            {error && <ErrorModal onClear={clearError} error={error} />}


            <div className="profile-heading-container">
                <div className="profile-heading">
                    Your Profile 
                </div>
            </div>
            <div className="view-edit-profile-container">
                <Input
                    element="input"
                    id="name"
                    type="text"
                    label="Name"
                    handleChange={(e) => { changeHandler(e, "name") }}
                    disabled={ (isLoading) ? true : false}
                    value={inputState.inputs.name.value}
                    errorText={validationError && validationError.name}
                    capitalize={true}
                />

                <Input
                    element="input"
                    id="username"
                    type="text"
                    label="Username"
                    handleChange={(e) => { changeHandler(e, "username") }}
                    disabled={(isLoading) ? true : false}
                  

                    value={inputState.inputs.username.value}
                    errorText={validationError && validationError.username}
                />
            </div>
            <div className="profile-button-container">
                {
                    isLoading
                        ?

                        <Stack sx={{ width: '100%',marginRight:'10px',marginLeft:'10px' }} spacing={2}>
                            <Alert variant="filled" severity="warning">

                                Updating please wait...
                            </Alert>
                        </Stack>

                        : isLoading === false && alertMsg
                            ? <Stack sx={{ width: '100%',marginRight:'10px',marginLeft:'10px' }}  spacing={2}>
                                <Alert variant="filled" severity="success"
                                   >

                                    {updateMsg}
                                </Alert>
                            </Stack>
                            :
                            <Button disabled={!formIsValid} onClick={openPasswordWindowHandler}>EDIT</Button>

                }

            </div>

            <form onSubmit={updateProfileHandler}>

                <Modal
                    onCancel={closePasswordWindowHandler}
                    header="Authenticate"
                    show={openPasswordWindow}
                    footer={<Button
                        disabled={!passwordFormIsValid}
                       
                        >
                        CONTINUE
                    </Button>}
                >

                    <div >
                        <Input
                            element="input"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            handleChange={(e) => { changeHandler(e, "password") }}
                            value={inputState.inputs.password.value}
                            errorText={validationError && validationError.password}
                            showPasswordHandler={showPasswordHandler}
                            autofocus={true}
                        />

                    </div>
                </Modal>


            </form>

        </div>

    )
}

export default ViewProfile;