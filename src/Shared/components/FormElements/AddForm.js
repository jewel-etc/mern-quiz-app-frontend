import React, { useEffect, useState } from 'react';

import Input from './Input.js';
import { validate } from '../Utils/Validators.js';
import Button from './Button.js';

import Backdrop from '../UIComponents/Backdrop.js';
import ErrorModal from '../UIComponents/ErrorModal.js';
import { useHttpClient } from '../Hooks/http-hook.js';
import { useForm } from '../Hooks/form-hook.js';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './AddForm.css';


const MySubjects = props => {
   
    const [validationError, setValidationError] = useState("abc");
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [optionAlert, setOptionAlert] = useState();
    const [alertMsg, setAlertMsg] = useState();


    
    let descriptionValue = '';
    if(props.item==='question'){
        descriptionValue='Choose the right one'

    }


    const [inputState, changeHandler] = useForm({

        name: {
            value: ""
        },
        description: {
            value: descriptionValue
        },
        question: {
            value: ''
        },
        option1: {
            value: ''
        },
        option2: {
            value: ''
        },
        option3: {
            value: ''
        },
        option4: {
            value: ''
        },
        correctOption: {
            value: ''
        },
        explanation: {
            value: ''
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
            />)

        } else if (props.item !== 'question' && (key === 'name' || key === 'description')) {

            inputForm.push(<Input
                key={key}
                element={key === 'description' ? 'textarea' : 'input'}
                id={key}
                type="text"
                label={key}
                handleChange={(e) => { changeHandler(e, key) }}
                value={inputState.inputs[key].value}
                autofocus={true}
                capitalize={true} 
                errorText={validationError && validationError[key]}
            />)
        }


    }


    useEffect(() => {
      
        setValidationError(validate(inputState, false, false,false, props.item))

    }, [inputState, props.item])

    let formIsValid = false;


    if (validationError && Object.keys(validationError).length === 0) {
        formIsValid = true

    } else {
        formIsValid = false
    }


    const addFormSubmitHandler = async (e) => {
       
        e.preventDefault();

        if (props.item === 'question') {

            let options = [inputState.inputs.option1.value.toUpperCase(),
            inputState.inputs.option2.value.toUpperCase(),
            inputState.inputs.option3.value.toUpperCase(),
            inputState.inputs.option4.value.toUpperCase()];

            let correctOption=inputState.inputs.correctOption.value.toUpperCase();

            let rightOption = options.includes(correctOption);
            let allOptionUnique = !options.some((option, i) => options.indexOf(option) < i);


            if(!allOptionUnique){
                setOptionAlert("4 options must unique")

            }

           else if (!rightOption) {
              
                setOptionAlert("Correct option must be from one of the options")
            } 
            
          
            else {

                try {
                    setAlertMsg("Adding please wait...")

                    await sendRequest(

                        props.url,
                        props.method,

                        JSON.stringify({

                            description: inputState.inputs.description.value,
                            question: inputState.inputs.question.value,
                            option1: inputState.inputs.option1.value,
                            option2: inputState.inputs.option2.value,
                            option3: inputState.inputs.option3.value,
                            option4: inputState.inputs.option4.value,
                            correctOption: inputState.inputs.correctOption.value,
                            explanation: inputState.inputs.explanation.value,
                            id: props.itemId

                        }),

                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + props.token
                        },


                    )
                    setAlertMsg("Added successfully...");
                    setTimeout(() => {
                        props.handleShowAddedItem();

                    }, 500)



                } catch (err) {setAlertMsg() }

            }

        } else {
            try {
                setAlertMsg("Adding please wait...")

                await sendRequest(

                    props.url,
                    props.method,

                    JSON.stringify({
                        name: inputState.inputs.name.value,
                        description: inputState.inputs.description.value,
                        id: props.itemId

                    }),

                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + props.token
                    },

                )

                setAlertMsg("Added successfully...");
                setTimeout(() => {
                    props.handleShowAddedItem();

                }, 500)


            } catch (err) {setAlertMsg() }

        }

    }

    const closeOptionMsgHandler = () => {
        setOptionAlert()
    }


    return (

        <>
        <Backdrop cancel={isLoading ?undefined : props.cancel} />


        <form className="add-form-container" onSubmit={addFormSubmitHandler}>
           
            {error && <ErrorModal onClear={clearError} error={error} />}
            <div className="add-form-heading-container">
                {props.heading}

            </div>
            {inputForm}


            <div className="add-button-container">
                {
                    (isLoading || !isLoading) && alertMsg &&
                    <Stack sx={{ width: '100%', height: 'auto', padding: '0',margin:'5px' }} spacing={2}>
                        <Alert variant="filled" severity="success"
                            style={{ paddingTop: 0, paddingBottom: 0 }}>
                            {alertMsg}
                        </Alert>
                    </Stack>

                }
                {
                    optionAlert &&
                    <Stack sx={{ width: '100%', height: 'auto', padding: '0',margin:'5px' }} spacing={2}>
                        <Alert onClose={closeOptionMsgHandler} severity="error"
                            style={{ paddingTop: 0, paddingBottom: 0 }}>
                            {optionAlert}
                        </Alert>
                    </Stack>
                }
                {
                    optionAlert === undefined && alertMsg === undefined &&
                    <Button disabled={!formIsValid}
                   
                        style={{ padding: '8px', paddingRight: '25px', paddingLeft: '25px' }} >
                        ADD
                    </Button>
                }


            </div>

        </form>

    </>


    )


}

export default MySubjects;