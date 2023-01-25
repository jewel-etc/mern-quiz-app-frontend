import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShowAndModifyForm from '../../../Shared/components/FormElements/ShowAndModifyForm.js';
import AddForm from '../../../Shared/components/FormElements/AddForm.js';
import Button from '../../../Shared/components/FormElements/Button.js';

import { AuthContext } from '../../../Shared/components/Context/auth-context.js';
import { useAddForm } from '../../../Shared/components/Hooks/add-form-hook.js';

const MySubjectsLists = props => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [disableAddButton, setDisableAddButton] = useState(false)

    const [openAddForm, openAddFormHandler, closeAddFormHandler] = useAddForm();

    const addTopicsHandler = (subId) => {
        history.push("/myTopics", { subId })
    }

    const disableAddButtonHandler = (disable) => {
        if (disable)
            setDisableAddButton(true)
        else
            setDisableAddButton(false)
    }

    return (
        <>
            <div className="my-main-container" style={{height:'70vh'}}>
              


                <div className="show-update-delete-container " >
                


                    {props.loadedCreatedSubjects && props.loadedCreatedSubjects.length === 0
                        && <div className="no-item-total-item-container" style={{color:'red'}}>
                            No Subjects added
                        </div>
                    }
                    {props.loadedCreatedSubjects && props.loadedCreatedSubjects.length > 0 &&
                        <div className="no-item-total-item-container">
                            <p>My Subjects :{props.loadedCreatedSubjects.length}</p>

                        </div>
                    }


                    {props.loadedCreatedSubjects && props.loadedCreatedSubjects.map((sub, index) => {

                        return (

                            <ShowAndModifyForm
                                key={sub.id}
                                updateUrl={`${process.env.REACT_APP_BACKEND_URL}/subjects/updateSubjectBySubjectId/`}
                                updateMethod='PATCH'
                                deleteUrl={`${process.env.REACT_APP_BACKEND_URL}/subjects/deleteSubjectBySubjectId/`}
                                deleteMethod='DELETE'
                                itemNo={index}
                                item="Subject"
                                itemId={sub.id}
                                name={sub.name}
                                description={sub.description}
                                addItem="Topic"
                                auuItemRoute="/myTopics"
                                handleAddItem={addTopicsHandler}
                                handleShowItemAfterDelete={props.handleShowItemAfterDelete}
                                disableAddButton={disableAddButtonHandler} />
                        )
                    })

                    }


                </div>



                <div className="add-container">


                    {
                        props.loadedCreatedSubjects && openAddForm &&


                        <AddForm

                            url={`${process.env.REACT_APP_BACKEND_URL}/subjects/createSubjectByUserId`}
                            method='POST'
                            itemId={auth.userId}
                            token={auth.token}
                            handleShowAddedItem={props.handleShowAddedItem}
                            heading="ADD SUBJECT"
                            cancel={closeAddFormHandler} />

                    }

                </div>


            </div>

            <div className="add-button-container">
                <Button

                    onClick={openAddFormHandler}
                    disabled={disableAddButton}
                    style={disableAddButton
                        ? { background: '#ccc', color: '#979797', borderColor: '#ccc' }
                        : { backgroundColor: 'green', borderColor: 'green' }}>
                    ADD NEW SUBJECT
                </Button>
            </div>
        </>
    )

}

export default MySubjectsLists;