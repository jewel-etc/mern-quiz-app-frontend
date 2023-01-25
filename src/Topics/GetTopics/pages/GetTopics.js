import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFetchTopicsUnitsBySubjectId } from "../../../Shared/components/Hooks/useFetchTopicsUnitsBySubjectId.js";
import { useFetchMySaveSub } from "../../../Shared/components/Hooks/useFetchMySaveSub.js";
import SelectItem from "../../../Shared/components/SelectItem/SelectItem.js";
import { AuthContext } from "../../../Shared/components/Context/auth-context.js";

import ErrorModal from "../../../Shared/components/UIComponents/ErrorModal.js";
import GetTopicsList from "../components/GetTopicsList.js";
import LoadingSpinner from "../../../Shared/components/UIComponents/LoadingSpinner.js";
import { useFetchUnitsByTopicId } from "../../../Shared/components/Hooks/useFetchUnitsByTopicId.js";
import "./GetTopics.css";

const GetTopics = (props) => {
  const [
    isLoading,
    error,
    clearError,
    fetchTopicsUnits,
    loadedTopics,
    loadedUnits,
  ] = useFetchTopicsUnitsBySubjectId();
  const [
    isSaveSubLoading,
    saveSubError,
    saveSubClearError,
    fetchSavedSubjects,
    loadedSavedSubjects,
  ] = useFetchMySaveSub();

  const [unitIsLoading, unitError, unitClearError, fetchUnits, fetchedUnits] =
    useFetchUnitsByTopicId();
  const [subId, setSubId] = useState(
    props.history.location.state.subId && props.history.location.state.subId
  );

  const [topicId] = useState(
    props.history.location.state.topicId && props.history.location.state.topicId
  );

  const [topicName] = useState(
    props.history.location.state.topicName &&
      props.history.location.state.topicName
  );
  const [subName] = useState(
    props.history.location.state.subName && props.history.location.state.subName
  );

  const [showUnits, setShowUnits] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (subId) {
      fetchTopicsUnits(subId);

      setShowUnits(false);
    }

    if (topicId) {
    
      
      fetchUnits(topicId);
    }
  }, [subId, fetchTopicsUnits, setShowUnits, fetchUnits, topicId]);

  let topics;
  if (loadedTopics) {
    topics = loadedTopics.map((topic) => ({ ...topic, isTouched: false }));
  }

  useEffect(() => {
    if (auth.token) {
      fetchSavedSubjects();
    }
  }, [fetchSavedSubjects, auth.token]);

  const selectSubIdHandler = useCallback(
    (subId) => {
      if (subId === " ") {
        setSubId();
      } else {
        setSubId(subId);
        fetchTopicsUnits(subId);
      }
    },
    [fetchTopicsUnits]
  );

  return (
    <div className="selectSubject-topic-unit-questions-container">
      {error && <ErrorModal onClear={clearError} error={error} />}

      {unitError && <ErrorModal onClear={unitClearError} error={unitError} />}
      {saveSubError && (
        <ErrorModal onClear={saveSubClearError} error={saveSubError} />
      )}

      <div className="select-save-subjects-container">
        {loadedSavedSubjects ? (
          <SelectItem
            loadedCreatedItem={loadedSavedSubjects}
            itemId={subId}
            selectItem="Select Subject"
            handleSelectedItem={selectSubIdHandler}
          />
        ) : (
          !auth.isLoggedIn && (
            <div className="selected-subject-container">
              <strong>
                Subject :<span style={{ color: "blue" }}> {subName}</span>
              </strong>
            </div>
          )
        )}
      </div>

      {(isLoading || isSaveSubLoading || unitIsLoading) && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingSpinner asOverlay />
        </div>
      )}
      {loadedTopics && loadedTopics.length === 0 && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          No Topics added till now
        </p>
      )}

      {loadedUnits && loadedUnits.length === 0 && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          No Units added till now
        </p>
      )}

      {subId &&
        // loadedSavedSubjects &&
        loadedTopics &&
        loadedUnits &&
        fetchedUnits &&
        loadedUnits.length > 0 &&
        loadedTopics.length > 0 &&
        fetchedUnits.length > 0 && (
          <div className="topics-units-questions-container">
           
            <GetTopicsList
              loadedTopics={topics}
              topicName={topicName}
              topicId={topicId}
              loadedUnits={loadedUnits}
              loadSelectedUnits={fetchedUnits}
              subId={subId}
              showUnits={showUnits}
            />
          </div>
        )}

      {subId &&
        // loadedSavedSubjects &&
        loadedTopics &&
        loadedUnits &&
        fetchedUnits===undefined &&
        loadedUnits.length > 0 &&
        loadedTopics.length > 0 &&
      (
          <div className="topics-units-questions-container" >
           
            <GetTopicsList
              loadedTopics={topics}
              topicName={topics[0].name}
              topicId={topics[0].id}
              loadedUnits={loadedUnits}
              loadSelectedUnits={undefined}
              subId={subId}
              showUnits={showUnits}
            />
          </div>
        )}
    </div>
  );
};

export default GetTopics;
