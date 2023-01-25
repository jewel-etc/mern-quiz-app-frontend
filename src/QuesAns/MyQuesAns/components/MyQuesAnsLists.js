import React, { useContext, useState, useEffect, useCallback } from "react";
import { useFetchMyCreatedTopics } from '../../../Shared/components/Hooks/useFetchMyCreatedTopics.js';
import { useFetchMyCreatedUnits } from "../../../Shared/components/Hooks/useFetchMyCreatedUnits.js";
import { useFetchMyCreatedQuesAns } from '../../../Shared/components/Hooks/useFetchMyCreatedQuesAns.js';
import SelectItem from '../../../Shared/components/SelectItem/SelectItem.js';
import AddForm from '../../../Shared/components/FormElements/AddForm.js';
import ShowAndModifyForm from '../../../Shared/components/FormElements/ShowAndModifyForm.js';
import LoadingSpinner from "../../../Shared/components/UIComponents/LoadingSpinner.js";
import { AuthContext } from "../../../Shared/components/Context/auth-context.js";
import ErrorModal from "../../../Shared/components/UIComponents/ErrorModal.js";
import Button from "../../../Shared/components/FormElements/Button.js";
import { useAddForm } from "../../../Shared/components/Hooks/add-form-hook.js";


const MyQuesAnsLists = props => {

    const auth = useContext(AuthContext);
    const [subId, setSubId] = useState();
    const [topicId, setTopicId] = useState();
    const [unitId, setUnitId] = useState(" ");
    const [openAddForm, openAddFormHandler, closeAddFormHandler] = useAddForm();
    const [disableAddButton, setDisableAddButton] = useState(false)



    const [topicIsLoading, topicError, topicClearError, fetchCreatedTopics, loadedCreatedTopics] = useFetchMyCreatedTopics();
    const [unitIsLoading, unitError, unitClearError, fetchCreatedUnits, loadedCreatedUnits] = useFetchMyCreatedUnits();
    const [quesAnsIsLoading, quesAnsError, quesAnsClearError, fetchCreatedQuesAns, loadedCreatedQuesAns] = useFetchMyCreatedQuesAns();

  

    const selectSubIdHandler = useCallback((subId) => {
        setTopicId()
        setUnitId()
       
        if (subId === " ") {
            setSubId()
            setTopicId()
            setUnitId()
        } else {
            setSubId(subId)
            fetchCreatedTopics(subId)
        }
    }, [fetchCreatedTopics])

  
    const selectTopicIdHandler = useCallback((topicId) => {
        setUnitId()
     

        if (topicId === " ") {
            setTopicId()

        }
        else {

            setTopicId(topicId)
            fetchCreatedUnits(topicId)
        }
    }, [fetchCreatedUnits])

  
    const selectUnitIdHandler = useCallback((unitId) => {

       

        if (unitId === " ") {
            setUnitId()
        }
        else {
            setUnitId(unitId)
            fetchCreatedQuesAns(unitId)
        }
    }, [fetchCreatedQuesAns])

    useEffect(() => {

        if (props.subId && props.topicId && props.unitId) {
            setSubId(props.subId)
            setTopicId(props.topicId)
            setUnitId(props.unitId)
            selectSubIdHandler(props.subId)
            selectTopicIdHandler(props.topicId)
            selectUnitIdHandler(props.unitId)

        }
    }, [selectTopicIdHandler,
        selectSubIdHandler,
        selectUnitIdHandler,
        props.unitId,
        props.subId,
        props.topicId]
    )



    const showAddedQuesAnsHandler = () => {
        closeAddFormHandler()
        fetchCreatedQuesAns(unitId)

    }

    const showQuesAnsAfterDeleteHandler = () => {
        fetchCreatedQuesAns(unitId)

    }

    const disableAddButtonHandler = (disable) => {
        if (disable)
            setDisableAddButton(true)
        else
            setDisableAddButton(false)
    }


    return (
        <>

           

            {(topicError || unitError || quesAnsError) &&

                <ErrorModal onClear={topicClearError || unitClearError || quesAnsClearError}

                    error={topicError || unitError || quesAnsError} />}

          

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

                {(topicIsLoading ) && <LoadingSpinner asOverlay/>}

            

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

                {(unitIsLoading) && <LoadingSpinner asOverlay/>}


             

                {
                    loadedCreatedUnits && loadedCreatedTopics && loadedCreatedTopics.length > 0 && topicId &&
                    <SelectItem
                        noItem="No Units added"
                        addItemButton="Add Unit"
                        addItemRoute="/myUnits"
                        loadedCreatedItem={loadedCreatedUnits}
                        subId={subId}
                        topicId={topicId}
                        itemId={unitId}
                        selectItem="Select Unit"
                        handleSelectedItem={selectUnitIdHandler} />
                }

                {(quesAnsIsLoading) && <LoadingSpinner asOverlay/>}

            </div>

            {loadedCreatedUnits && loadedCreatedUnits.length > 0 && loadedCreatedTopics && loadedCreatedTopics.length > 0 && unitId && loadedCreatedQuesAns &&
                <>
                    <div className="my-main-container">
                    
                        <div className="show-update-delete-container" >
                          


                            {loadedCreatedQuesAns && loadedCreatedQuesAns.length === 0 && topicId &&
                                <div className="no-item-total-item-container" style={{color:'red'}}>
                                    No Questions added
                                </div>
                            }
                            {loadedCreatedQuesAns && loadedCreatedQuesAns.length > 0 && topicId &&
                                <div className="no-item-total-item-container">

                                    <p>TotalQuestions :{loadedCreatedQuesAns.length}</p>

                                </div>
                            }


                            {loadedCreatedQuesAns && subId && topicId && unitId && loadedCreatedQuesAns.map((qA, index) => {

                                return (

                                    <ShowAndModifyForm

                                        item="question"
                                        updateUrl={`${process.env.REACT_APP_BACKEND_URL}/quesAns/updateQuesAnsByQuesAnsId/`}
                                        updateMethod='PATCH'
                                        deleteUrl={`${process.env.REACT_APP_BACKEND_URL}/quesAns/deleteQuesAnsByQuesAnsId/`}
                                        deleteMethod='DELETE'
                                        key={qA.id}
                                        itemNo={index}
                                       
                                        itemId={qA.id}
                                        description={qA.description}
                                        question={qA.question}
                                        option1={qA.option1}
                                        option2={qA.option2}
                                        option3={qA.option3}
                                        option4={qA.option4}
                                        correctOption={qA.correctOption}
                                        explanation={qA.explanation}
                                        handleShowItemAfterDelete={showQuesAnsAfterDeleteHandler}
                                        disableAddButton={disableAddButtonHandler}
                                    />
                                )
                            })

                            }
                        </div>

                      


                        {loadedCreatedQuesAns && topicId && subId && unitId && openAddForm &&
                            <div className="add-container">
                               
                                <AddForm

                                    item="question"
                                    url={`${process.env.REACT_APP_BACKEND_URL}/quesAns/createQuesAnsByUnitId`}
                                    method='POST'
                                    itemId={unitId}
                                    token={auth.token}
                                    handleShowAddedItem={showAddedQuesAnsHandler}
                                    heading="ADD QUESTION"
                                    itemNameLabel="Name:"
                                    itemDescriptionLabel="Description:"
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
                            ADD NEW QUESTION
                        </Button>
                    </div>
                </>
            }
        </>
    )

}

export default MyQuesAnsLists;