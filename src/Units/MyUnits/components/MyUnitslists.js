import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHistory } from 'react-router-dom';
import { useFetchMyCreatedTopics } from '../../../Shared/components/Hooks/useFetchMyCreatedTopics.js';
import { useFetchMyCreatedUnits } from "../../../Shared/components/Hooks/useFetchMyCreatedUnits.js";
import SelectItem from '../../../Shared/components/SelectItem/SelectItem.js';
import AddForm from '../../../Shared/components/FormElements/AddForm.js';
import ShowAndModifyForm from '../../../Shared/components/FormElements/ShowAndModifyForm.js';
import LoadingSpinner from "../../../Shared/components/UIComponents/LoadingSpinner.js";
import { AuthContext } from "../../../Shared/components/Context/auth-context.js";
import ErrorModal from "../../../Shared/components/UIComponents/ErrorModal.js";
import Button from "../../../Shared/components/FormElements/Button.js";
import { useAddForm } from "../../../Shared/components/Hooks/add-form-hook.js";



const MyUnitsLists = props => {

    const auth = useContext(AuthContext);
    const history = useHistory();
    const [subId, setSubId] = useState();
    const [topicId, setTopicId] = useState();
    const [openAddForm, openAddFormHandler, closeAddFormHandler] = useAddForm();
    const [disableAddButton, setDisableAddButton] = useState(false)

    const [topicIsLoading, topicError, topicClearError, fetchCreatedTopics, loadedCreatedTopics] = useFetchMyCreatedTopics();
    const [unitIsLoading, unitError, unitClearError, fetchCreatedUnits, loadedCreatedUnits] = useFetchMyCreatedUnits();

  

    const selectSubIdHandler = useCallback((subId) => {

        if (subId === " ") {
            setSubId()
            setTopicId()
        } else {
            setSubId(subId)
            fetchCreatedTopics(subId)
        }
    }, [fetchCreatedTopics])

   
    const selectTopicIdHandler = useCallback((topicId) => {


        if (topicId === " ") {
            setTopicId()
        }
        else {
            setTopicId(topicId)
            fetchCreatedUnits(topicId)
        }
    }, [fetchCreatedUnits])

    useEffect(() => {


        if (props.subId && props.topicId) {

            setSubId(props.subId)
            setTopicId(props.topicId)
            selectSubIdHandler(props.subId)
            selectTopicIdHandler(props.topicId)
          

        }
    }, [selectTopicIdHandler, selectSubIdHandler, props.subId, props.topicId])



    const showAddedUnitHandler = () => {
        closeAddFormHandler()
        fetchCreatedUnits(topicId)

    }

    const showUnitAfterDeleteHandler = () => {
        fetchCreatedUnits(topicId)

    }

    const addUnitsHandler = (unitId) => {
     
        history.push("/myQuesAns",

            { subId: subId, topicId: topicId, unitId: unitId }
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

           

            {(topicError || unitError) && <ErrorModal onClear={topicClearError || unitClearError} error={topicError || unitError} />}
          

            <div className="my-select-container">
               


                {
                    props.loadedCreatedSubjects &&
                    <SelectItem
                        noItem="No Subjects added"
                        addItemButton="Add Subject"
                        addItemRoute="/mySubjects"
                        loadedCreatedItem={props.loadedCreatedSubjects.sort((a, b) => (a.name > b.name) ? 1 : -1)}
                        itemId={subId}
                        selectItem="Select Subject"
                        handleSelectedItem={selectSubIdHandler} />
                }

                {(topicIsLoading ) && <LoadingSpinner asOverlay />}

                {
                    loadedCreatedTopics && subId &&
                    <SelectItem
                        noItem="No Topics added"
                        addItemButton="Add Topic"
                        addItemRoute="/myTopics"
                        loadedCreatedItem={loadedCreatedTopics}
                        subId={subId}
                        itemId={topicId}
                        selectItem="Select Topic"
                        handleSelectedItem={selectTopicIdHandler} />
                }

                {(unitIsLoading ) && <LoadingSpinner asOverlay />}

            </div>

            {loadedCreatedTopics && loadedCreatedTopics.length > 0 && topicId &&
                <>
                    <div className="my-main-container">
                   
                        <div className="show-update-delete-container">                       


                            {loadedCreatedUnits && loadedCreatedUnits.length === 0 && topicId &&
                                <div className="no-item-total-item-container" style={{color:'red'}}>
                                    No Units added
                                </div>
                            }
                            {loadedCreatedUnits && loadedCreatedUnits.length > 0 && topicId &&
                                <div className="no-item-total-item-container">

                                    <p>Total Units :{loadedCreatedUnits.length}</p>

                                </div>
                            }


                            {loadedCreatedUnits && subId && topicId && loadedCreatedUnits.map((unit, index) => {

                                return (

                                    <ShowAndModifyForm

                                        updateUrl={`${process.env.REACT_APP_BACKEND_URL}/units/updateUnitByUnitId/`}
                                        updateMethod='PATCH'
                                        deleteUrl={`${process.env.REACT_APP_BACKEND_URL}/units/deleteUnitByUnitId/`}
                                        deleteMethod='DELETE'
                                        key={unit.id}
                                        itemNo={index}
                                        item="Unit "
                                        itemId={unit.id}
                                        name={unit.name}
                                        description={unit.description}
                                        addItem="Ques"
                                        handleAddItem={addUnitsHandler}
                                        handleShowItemAfterDelete={showUnitAfterDeleteHandler}
                                        disableAddButton={disableAddButtonHandler}
                                    />
                                )
                            })

                            }
                        </div>                      


                        {loadedCreatedUnits && openAddForm &&
                            <div className="add-container">
                               
                                <AddForm
                                    url={`${process.env.REACT_APP_BACKEND_URL}/units/createUnitByTopicId`}
                                    method='POST'
                                    itemId={topicId}
                                    token={auth.token}
                                    handleShowAddedItem={showAddedUnitHandler}
                                    heading="ADD UNIT"
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
                            ADD NEW UNIT
                        </Button>
                    </div>
                </>
            }
        </>
    )

}

export default MyUnitsLists;