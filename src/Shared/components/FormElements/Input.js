import React, { useReducer } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {

        case 'TOUCH':
            if ((action.id === 'password' || action.id === 'oldPassword'
                || action.id === 'newPassword' || action.id === 'confirmPassword') && action.event === 'blur') {
                return {
                    ...state,
                    isTouched: true,
                    passwordBorder: false,
                    adminPasswordBorder: false
                }

            }

            if ((action.id === 'password' || action.id === 'oldPassword'
                || action.id === 'newPassword' || action.id === 'confirmPassword') && action.event === 'focus') {
                return {
                    ...state,
                    isTouched: true,
                    passwordBorder: true,
                    adminPasswordBorder: false
                }

            }


            if (action.id === 'adminPassword' && action.event === 'blur') {
                return {
                    ...state,
                    isTouched: true,
                    passwordBorder: false,
                    adminPasswordBorder: false
                }

            }

            if (action.id === 'adminPassword' && action.event === 'focus') {
                return {
                    ...state,
                    isTouched: true,
                    passwordBorder: false,
                    adminPasswordBorder: true
                }

            }

            if (action.event === 'blur') {
                return {
                    ...state,
                    isTouched: true,
                    passwordBorder: false,
                    adminPasswordBorder: false
                }

            }

            if (action.event === 'focus') {
                return {
                    ...state,
                    isTouched: true,
                    passwordBorder: false,
                    adminPasswordBorder: false
                }

            }
            
            break;

        default:
            return state;
    }
}


const Input = props => {


    const [inputState, dispatch] = useReducer(inputReducer,
        {
            isTouched: false,
            showPasswordBorder: false,         
            showAdminPasswordBorder: false,
            
        })
    

    let formElement;

    const touchHandler = (id, event) => {
        dispatch({
            type: 'TOUCH',
            id: id,
            event: event

        })
    }

    switch (props.element) {
        case 'input':
            formElement =
                <input
                    key={props.id}
                    id={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={props.handleChange}
                    autoFocus={props.autofocus}
                    style={props.capitalize?{textTransform:'capitalize'}:{}}

                    onBlur={() => { touchHandler(props.id, 'blur') }}
                    onFocus={() => { touchHandler(props.id, 'focus') }}
                    onClick={props.onClick}
                    value={props.value}
                    disabled={props.disabled} />
            break;
        case 'textarea':
            formElement =
                <textarea
                    key={props.id}
                    id={props.id}
                    rows={props.rows || 3}
                    onChange={props.handleChange}                
                    onFocus={() => { touchHandler(props.id, 'focus') }}
                    value={props.value}
                    disabled={props.disabled} />
            break;
        default:
            break;
    }

    let formOption;
    if (props.id.includes('option') || props.id.includes('Option')) {
        formOption = 'form-control-option'


    }

    let formControlShowPassword;
    if (props.id === 'password' || props.id === 'adminPassword' || props.id === 'oldPassword'
        || props.id === 'newPassword' || props.id === 'confirmPassword') {
        formControlShowPassword = 'form-control-show-password'
      
    }
    return (
        <div className={`form-control  ${props.errorText && inputState.isTouched && 'form-control-invalid'} 
        ${formOption}  ${formControlShowPassword} `}>
            <label htmlFor={props.id} style={{ textTransform: 'capitalize' }}>{props.label}:</label>
            {formElement}

            {(props.id === 'password' || props.id === 'oldPassword'
                || props.id === 'newPassword' || props.id === 'confirmPassword') &&
                <div
                    className={props.disabled ? "show-password-container-disabled" : "show-password-container"}
                    style={{ borderColor: inputState.passwordBorder && '#000000' }}
                    onClick={props.showPasswordHandler}>
                    {
                        !props.disabled
                            ? props.type === 'password'
                                ? <AiFillEye style={{ color: 'green', fontSize: '1.5rem' }} />
                                : <AiFillEyeInvisible style={{ color: 'blue', fontSize: '1.5rem' }} />
                            :
                            null

                    }

                </div>
            }

            {(props.id === 'adminPassword') &&
                <div className="show-admin-password-container" style={{ borderColor: inputState.adminPasswordBorder && '#000000' }}
                    onClick={props.showAdminPasswordHandler}>
                    {
                        props.type === 'password'
                            ? <AiFillEye style={{ color: 'green', fontSize: '1.5rem' }} />
                            : <AiFillEyeInvisible style={{ color: 'blue', fontSize: '1.5rem' }} />
                    }
                </div>
            }

            <p style={props.errorText && props.errorText === 'New & Confirm password matched' ? { color: 'green' } : {}}>
                {
                    props.disabled
                        ? ' '
                        : props.errorText && inputState.isTouched && props.errorText

                }

            </p>
           

        </div>

    )
}

export default Input;