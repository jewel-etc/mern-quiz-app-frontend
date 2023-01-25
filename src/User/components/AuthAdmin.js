import React, { useEffect, useState, useContext } from 'react';

import Input from '../../Shared/components/FormElements/Input.js';
import { validate } from '../../Shared/components/Utils/Validators.js';
import Button from '../../Shared/components/FormElements/Button.js';
import { AuthContext } from '../../Shared/components/Context/auth-context.js';
import { useHttpClient } from '../../Shared/components/Hooks/http-hook.js';
import CircularProgress from '@mui/material/CircularProgress';



const Auth = props => {

    const auth = useContext(AuthContext);

    const [validationError, setValidationError] = useState(undefined);
    const [isLoading, error, sendRequest] = useHttpClient();
    const [showError, setShowError] = useState(false);





    useEffect(() => {


        setValidationError(validate(props.inputState, true, true))

    }, [props.inputState])


    const {authenticate}=props


    useEffect(()=>{

        authenticate(isLoading);
 
     },[authenticate, isLoading])

    let formIsValid = false;


    if (validationError && Object.keys(validationError).length === 0) {
        formIsValid = true

    } else {
        formIsValid = false
    }


    const authSubmitHandler = async (e) => {
        e.preventDefault();
        setShowError(false)
        

        try {

            const responseData = await sendRequest(

                `${process.env.REACT_APP_BACKEND_URL}/users/login`,//url

                'POST',//method

                JSON.stringify({    //body
                    favSave: props.save ? 'save' : 'fav',
                    username: props.inputState.inputs.username.value,
                    password: props.inputState.inputs.password.value,
                    adminPassword: props.inputState.inputs.adminPassword.value,
                    newFavSubjectsIds: auth.favSubjectsIds,
                    newSaveSubjectsIds: props.saveSubjects? props.saveSubjects : [],

                }),

                {
                    'Content-Type': 'application/json' //headers
                },
            )



            auth.login(
                responseData.userId,
                responseData.name,
                responseData.username,
                responseData.token,
                responseData.isAdmin,
                responseData.favSubjectsIds,
                responseData.saveSubjectsIds

            )
            props.myLearning()

        } catch (err) {

            setShowError(true)

        }


    }

    return (

        <form
            className="auth-form"

            onSubmit={authSubmitHandler}>

            

            <div className="auth-form-heading">

                <p
                    style={{ margin: '0' }}>
                    A D M I N<span style={{ color: 'rgb(105, 55, 245)' }}>sp</span> L O G I N
                </p>

            </div>



            <Input
                element="input"
                id="username"
                type="text"
                label="Username"
                autofocus={true}

                handleChange={(e) => { props.handleChange(e, "username") }}
                value={props.inputState.inputs.username.value}
                errorText={validationError && validationError.username}

            />
            <Input
                element="input"
                id="password"
                type={props.showPassword ? 'text' : 'password'}
                label="Password"
                handleChange={(e) => { props.handleChange(e, "password") }}
                value={props.inputState.inputs.password.value}
                errorText={validationError && validationError.password}
                showPasswordHandler={props.showPasswordHandler}
            />
            <Input
                element="input"
                id="adminPassword"
                type={props.showAdminPassword ? 'text' : 'password'}
                label="Admin Password"
                handleChange={(e) => { props.handleChange(e, "adminPassword") }}
                value={props.inputState.inputs.adminPassword.value}
                errorText={validationError && validationError.adminPassword}
                showAdminPasswordHandler={props.showAdminPasswordHandler}
            />

            <p style={{
                margin: '0',
                height: '20px',
                textAlign: 'left',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '10px',
                color: 'red',
                fontSize: 'small'
            }}>
                {error && showError && error}
            </p>

            <div className="signup-login-button-container">

                {
                    isLoading
                        ?

                        <CircularProgress color="success" /> :

                        <Button disabled={!formIsValid} style={{ margin: '0', height: '40px' }} >
                            Admin Log in
                        </Button>
                }

            </div>

        </form>




    )
}
export default Auth;