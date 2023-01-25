import React, { useState, useEffect, useCallback, useContext } from "react";

import { useFetchQuesAnsByUnitId } from "../../../Shared/components/Hooks/useFetchQuesAnsByUnitId.js";
import GetQuesAnsList from "../../../QuesAns/GetQuesAns/pages/GetQuesAnsList.js";
import ErrorModal from "../../../Shared/components/UIComponents/ErrorModal.js";
import { AuthContext } from "../../../Shared/components/Context/auth-context.js";

const GetTopicsList = (props) => {
  const auth = useContext(AuthContext);
  const [
    quesAnsIsLoading,
    quesAnsError,
    quesAnsClearError,
    fetchQuesAns,
    loadedQuesAns,
  ] = useFetchQuesAnsByUnitId();
  const [topicId, setTopicId] = useState();
  const [topicName, setTopicName] = useState("");
  const [unitId, setUnitId] = useState();
  const [unitName, setUnitName] = useState("");

  const [showTopicsUnitsContainer, setShowTopicsUnitsContainer] =
    useState(true);
  const [loadedTopics, setLoadedTopics] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [
    showTopicsUnitsContainerSmallDevice,
    setShowTopicsUnitsContainerSmallDevice,
  ] = useState(false);

  const [clickOnTopic, setClickOnTopic] = useState(false);

  const callback = useCallback(() => {
    const ismobile = window.innerWidth <= 1000;
    if (ismobile !== isMobile) setIsMobile(ismobile);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, [callback]);

  useEffect(() => {
    if (topicId) {
      props.loadedTopics.map((topic) =>
        topic.isTouched
          ? (topic.animatedOpen = false)
          : (topic.animatedClose = false)
      );
    }

    if (topicId === undefined && props.loadSelectedUnits && !auth.isLoggedIn) {
      fetchQuesAns(props.loadSelectedUnits[0].id);
      setTopicId(props.topicId);
      setTopicName(
        props.topicName ? props.topicName : props.loadedTopics[0].name
      );
      setUnitId(props.loadSelectedUnits[0].id);
      setUnitName(props.loadSelectedUnits[0].name);
      props.loadedTopics.map((topic) =>
        topic.id === props.topicId ? (topic.isTouched = true) : false
      );
      setLoadedTopics([...props.loadedTopics]);
    }

    if (topicId === undefined && props.loadSelectedUnits && auth.isLoggedIn) {
      console.log("undefined topicid login 1 : ", topicId);
      fetchQuesAns(props.loadSelectedUnits[0].id);
      setTopicId(props.topicId);
      setTopicName(
        props.topicName ? props.topicName : props.loadedTopics[0].name
      );
      setUnitId(props.loadSelectedUnits[0].id);
      setUnitName(props.loadSelectedUnits[0].name);
      props.loadedTopics.map((topic) =>
        topic.id === props.topicId ? (topic.isTouched = true) : false
      );
      setLoadedTopics([...props.loadedTopics]);
    }

    if (
      topicId === undefined &&
      props.loadSelectedUnits === undefined &&
      auth.isLoggedIn
    ) {
      fetchQuesAns(props.loadedUnits[0].id);
      setTopicId(props.topicId);
      setTopicName(
        props.topicName ? props.topicName : props.loadedTopics[0].name
      );
      setUnitId(props.loadedUnits[0].id);
      setUnitName(props.loadedUnits[0].name);
      props.loadedTopics.map((topic) =>
        topic.id === props.topicId ? (topic.isTouched = true) : false
      );
      setLoadedTopics([...props.loadedTopics]);
    }
  }, [
    props.subId,
    props.loadedUnits,
    props.topicId,
    auth.isLoggedIn,
    topicId,
    fetchQuesAns,
    props.loadedTopics,
    props.topicName,
    props.loadSelectedUnits,
    setTopicId,
    setLoadedTopics,
    setTopicName,
    setUnitName,
    clickOnTopic,
  ]);

  const showUnitsHandler = (tId) => {
    setClickOnTopic((prevState) => !prevState);
    setTopicId(tId);
    loadedTopics.map((topic) =>
      topic.id === tId
        ? topic.isTouched === true
          ? ((topic.isTouched = false), (topic.animatedClose = true))
          : ((topic.isTouched = true), (topic.animatedOpen = true))
        : null
    );
    setLoadedTopics([...loadedTopics]);
  };
  const showQuestionsHandler = (unitId) => {
    
    let selectedUnit = props.loadedUnits.find((unit) => unit.id === unitId);
    let selectedTopic = loadedTopics.find(
      (topic) => topic.id === selectedUnit.topicId
    );
    setTopicName(selectedTopic.name);
    setUnitName(selectedUnit.name);
    setUnitId(unitId);
    fetchQuesAns(unitId);
    if (isMobile) {
      setShowTopicsUnitsContainerSmallDevice(false);
    }
  };

  let quesAns;
  if (loadedQuesAns) {
    quesAns = loadedQuesAns.map((quesAns) => ({
      ...quesAns,
      isTouched: false,
    }));
  }

  const closeTopicsUnitsContainerHandler = () => {
    setShowTopicsUnitsContainer(false);

    if (isMobile) {
      setShowTopicsUnitsContainerSmallDevice(false);
    }
  };

  const showTopicsUnitsContainerHandler = () => {
    setShowTopicsUnitsContainer(true);

    if (isMobile) {
      setShowTopicsUnitsContainerSmallDevice(true);
    }
  };

  return (
    <div
      className="questions-unit-topic-score-container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        alignContent: "flex-start",
        height: "100%",

        overflowX: "hidden",
        // backgroundColor:'red'
      }}
    >
      {quesAnsError && (
        <ErrorModal onClear={quesAnsClearError} error={quesAnsError} />
      )}

      <GetQuesAnsList
        quesAnsIsLoading={quesAnsIsLoading}
        loadedQuesAns={quesAns}
        showTopicsUnitsContainer={showTopicsUnitsContainer}
        showTopicsUnitsContainerSmallDevice={
          showTopicsUnitsContainerSmallDevice
        }
        showTopicsUnitsContainerHandler={showTopicsUnitsContainerHandler}
        topicName={topicName && topicName}
        unitName={unitName && unitName}
        loadedTopics={loadedTopics}
        isMobile={isMobile}
        showUnitsHandler={showUnitsHandler}
        closeTopicsUnitsContainerHandler={closeTopicsUnitsContainerHandler}
        topicId={topicId}
        loadedUnits={props.loadedUnits}
        unitId={unitId}
        showQuestionsHandler={showQuestionsHandler}
      />
    </div>
  );
};

export default GetTopicsList;
