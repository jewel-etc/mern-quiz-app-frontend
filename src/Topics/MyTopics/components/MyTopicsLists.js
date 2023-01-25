import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useFetchMyCreatedTopics } from '../../../Shared/components/Hooks/useFetchMyCreatedTopics.js';
import SelectItem from '../../../Shared/components/SelectItem/SelectItem.js';
import AddForm from '../../../Shared/components/FormElements/AddForm.js';
import ShowAndModifyForm from '../../../Shared/components/FormElements/ShowAndModifyForm.js';
import LoadingSpinner from "../../../Shared/components/UIComponents/LoadingSpinner.js";
import { AuthContext } from "../../../Shared/components/Context/auth-context.js";
import ErrorModal from "../../../Shared/components/UIComponents/ErrorModal.js";
import Button from "../../../Shared/components/FormElements/Button.js";
import { useAddForm } from "../../../Shared/components/Hooks/add-form-hook.js";



const MyTopicsLists = props => {

    const auth = useContext(AuthContext);
    const history = useHistory();
    const [subId, setSubId] = useState();
    const [openAddForm, openAddFormHandler, closeAddFormHandler] = useAddForm();
    const [topicIsLoading, topicError, topicClearError, fetchCreatedTopics, loadedCreatedTopics] = useFetchMyCreatedTopics();
    const [disableAddButton, setDisableAddButton] = useState(false)

    const selectSubIdHandler = useCallback((subId) => {
        if (subId === " ") {
            setSubId()
        } else {
            setSubId(subId)
            fetchCreatedTopics(subId)
        }

    }, [fetchCreatedTopics])

    useEffect(() => {

        if (props.subId) {
            setSubId(props.subId)
            selectSubIdHandler(props.subId)

        }
    }, [selectSubIdHandler, props.subId])



    const showAddedTopicHandler = () => {
        closeAddFormHandler()
        fetchCreatedTopics(subId)

    }

    const showTopicAfterDeleteHandler = () => {
        fetchCreatedTopics(subId)

    }

    const addUnitsHandler = (topicId) => {
     
        history.push("/myUnits",

            { subId: subId, topicId: topicId }
        )
    }

    const disableAddButtonHandler = (disable) => {
        if (disable)
            setDisableAddButton(true)
        else
            setDisableAddButton(false)
    }



    return (
        <>
           




            {topicError && <ErrorModal onClear={topicClearError} error={topicError} />}
          


            <div className="my-select-container">
              



                {props.loadedCreatedSubjects && <SelectItem
                    noItem="No Subjects added"
                    addItemButton="Add Subject"
                    addItemRoute="/mySubjects"
                    loadedCreatedItem={props.loadedCreatedSubjects.sort((a, b) => (a.name > b.name) ? 1 : -1)}
                
                    itemId={subId}
                    selectItem="Select Subject"
                    handleSelectedItem={selectSubIdHandler} />}

            </div>

            {topicIsLoading && <LoadingSpinner asOverlay />}

            {
                loadedCreatedTopics && subId &&
                <>

                    <div className="my-main-container" >

                        <div className="show-update-delete-container"  >
                         


                            {loadedCreatedTopics && loadedCreatedTopics.length === 0 && subId &&
                                <div className="no-item-total-item-container" style={{color:'red'}}>
                                    No Topics added
                                </div>
                            }
                            {loadedCreatedTopics && loadedCreatedTopics.length > 0 && subId &&
                                <div className="no-item-total-item-container">
                                    <p>My Topics :{loadedCreatedTopics.length}</p>

                                </div>
                            }


                            {loadedCreatedTopics && subId && loadedCreatedTopics.map((topic, index) => {

                                return (

                                    <ShowAndModifyForm


                                        updateUrl={`${process.env.REACT_APP_BACKEND_URL}/topics/updateTopicByTopicId/`}
                                        updateMethod='PATCH'
                                        deleteUrl={`${process.env.REACT_APP_BACKEND_URL}/topics/deleteTopicByTopicId/`}
                                        deleteMethod='DELETE'
                                        key={topic.id}
                                        itemNo={index}
                                        item="Topic "
                                        itemId={topic.id}
                                        name={topic.name}
                                        description={topic.description}
                                        addItem="Unit"
                                        handleAddItem={addUnitsHandler}
                                        handleShowItemAfterDelete={showTopicAfterDeleteHandler}
                                        disableAddButton={disableAddButtonHandler}
                                    />
                                )
                            })

                            }
                        </div>

                      


                        {loadedCreatedTopics && openAddForm &&
                            <div className="add-container ">


                                <AddForm

                                    url={`${process.env.REACT_APP_BACKEND_URL}/topics/createTopicBySubjectId`}
                                    method='POST'
                                    itemId={subId}
                                    token={auth.token}
                                    handleShowAddedItem={showAddedTopicHandler}
                                    heading="ADD TOPIC"
                                    cancel={closeAddFormHandler}
                                />

                            </div>
                        }

                    </div>

                    <div className="add-button-container">
                        <Button
                            onClick={openAddFormHandler}
                            disabled={disableAddButton}
                            style={disableAddButton
                                ? { background: '#ccc', color: '#979797', borderColor: '#ccc' }
                                : { backgroundColor: 'green', borderColor: 'green' }}>
                            ADD NEW TOPIC
                        </Button>
                    </div>
                </>
            }
        </>
    )

}

export default MyTopicsLists;