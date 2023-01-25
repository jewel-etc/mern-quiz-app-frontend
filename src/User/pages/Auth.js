import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Shared/components/Context/auth-context.js';
import { useForm } from '../../Shared/components/Hooks/form-hook.js';
import AuthLinks from '../components/AuthLinks.js';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthAdmin from '../components/AuthAdmin.js';
import AuthUser from '../components/AuthUser.js';
import AuthSignup from '../components/AuthSignup.js';
import { useHistory } from 'react-router-dom';
import Backdrop from '../../Shared/components/UIComponents/Backdrop.js';

import './Auth.css';

const Auth = props => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [showAdminPassword, setShowAdminPassword] = useState(false);

    const [inputState, changeHandler] = useForm({

        name: {
            value: ''
        },
        username: {
            value: ''
        },
        password: {
            value: ''
        },
        adminPassword: {
            value: ''
        }


    });



    const showPasswordHandler = () => {
        setShowPassword(prevState => !prevState);

    }

    const showAdminPasswordHandler = () => {
        setShowAdminPassword(prevState => !prevState);

    }

    const myLearning = () => {
        history.push("/myLearning")

    }

    return (
        <>
         <Backdrop cancel={!props.authIsLoading ? props.closeAuthHandler : undefined} />


        <div className="auth-form-container box-shadow">
           

            <BrowserRouter>
                <AuthLinks />


                <Switch>

                    <Route path="/authAdmin">
                        <AuthAdmin
                            save={props.save}
                            inputState={inputState}
                            handleChange={changeHandler}
                            showPasswordHandler={showPasswordHandler}
                            showAdminPasswordHandler={showAdminPasswordHandler}
                            showPassword={showPassword}
                            showAdminPassword={showAdminPassword}
                            saveSubjects={props.saveSubject ? props.saveSubject : auth.favSubjectsIds}
                            authenticate={props.authenticateHandler}
                            myLearning={myLearning} />
                    </Route>


                    <Route path="/authUser">
                        <AuthUser
                            save={props.save}
                            inputState={inputState}
                            handleChange={changeHandler}
                            showPasswordHandler={showPasswordHandler}
                            showPassword={showPassword}
                            saveSubjects={props.saveSubject ? props.saveSubject : auth.favSubjectsIds}
                            authenticate={props.authenticateHandler}
                            myLearning={myLearning} />

                    </Route>

                    <Route path="/authSignup">
                        <AuthSignup
                            save={props.save}
                            inputState={inputState}
                            handleChange={changeHandler}
                            showPasswordHandler={showPasswordHandler}
                            showPassword={showPassword}
                            saveSubjects={props.saveSubject ? props.saveSubject : auth.favSubjectsIds}
                            authenticate={props.authenticateHandler}
                            myLearning={myLearning} />
                    </Route>

                    <Redirect to="/authUser" />
                </Switch>
            </BrowserRouter>
        </div>
        </>

    )
}
export default Auth;