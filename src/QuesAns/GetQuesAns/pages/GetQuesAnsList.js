import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FcFilledFilter } from "react-icons/fc";
import GetQuesAnsItem from "../components/GetQuesAnsItem.js";
import Button from "../../../Shared/components/FormElements/Button.js";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { GrClose } from "react-icons/gr";
import { MdKeyboardArrowDown } from "react-icons/md";

import "./GetQuesAnsList.css";

const GetQuesAnsList = (props) => {
  const [showContentText, setShowContentText] = useState();
  const [loadedQuesAns, setLoadedQuesAns] = useState();
  const [resetDisable, setResetDisable] = useState(true);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth <= 1000;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  useEffect(() => {
    if (loadedQuesAns && props.loadedQuesAns) {
      loadedQuesAns.map((quesAns) =>
        quesAns.isTouched === true ? (quesAns.isTouched = true) : null
      );
      setLoadedQuesAns(loadedQuesAns);
    } else {
      setLoadedQuesAns(props.loadedQuesAns);
      setResetDisable(true);
      setScore(0);
      setCount(0);
    }
  }, [
    setLoadedQuesAns,
    setResetDisable,
    props.loadedQuesAns,
    loadedQuesAns,
    score,
  ]);

  const showContentTextHandler = () => {
    setShowContentText(true);
  };

  const closeContentTextHandler = () => {
    setShowContentText(false);
  };

  const optionHandler = (quesAnsId, option, correctOption) => {
    console.log("corre ",correctOption)
    loadedQuesAns.map((quesAns) =>
      quesAns.id === quesAnsId ? (quesAns.isTouched = true) : null
    );
    setLoadedQuesAns([...loadedQuesAns]);
    setResetDisable(false);
    if (option === correctOption) {
      setScore((prevState) => prevState + 1);
    }
    setCount((prevState) => prevState + 1);
  };
  const resetHandler = () => {
    loadedQuesAns.map((quesAns) =>
      quesAns.isTouched === true ? (quesAns.isTouched = false) : null
    );
    setLoadedQuesAns([...loadedQuesAns]);
    setResetDisable(true);
    setScore(0);
    setCount(0);
  };

  let units;
  const loadUnitsHandler = (topic) => {
    // alert(topic)
    let p = 1;

    units =
      props.loadedUnits &&
      props.loadedUnits.map((unit, unitIndex) => {
        return (
          <div key={unit.id}>
            {props.loadedUnits[unitIndex].topicId === topic.id && (
              <div
                className={
                  topic.isTouched &&
                  props.loadedUnits[unitIndex].topicId === topic.id &&
                  props.topicId === topic.id &&
                  topic.animatedOpen
                    ? "unit-name-container-animated-open"
                    : !topic.isTouched &&
                      props.loadedUnits[unitIndex].topicId === topic.id &&
                      props.topicId === topic.id &&
                      topic.animatedClose
                    ? "unit-name-container-animated-close"
                    : !topic.isTouched && !topic.animatedClose
                    ? "unit-name-container-close"
                    : topic.isTouched && !topic.animatedOpen
                    ? "unit-name-container-open"
                    : "unit-name-container-close"
                }
                onClick={() => {
                  props.quesAnsIsLoading === false &&
                    props.showQuestionsHandler(unit.id);
                }}
                style={{
                  backgroundColor: unit.id === props.unitId && "grey",
                }}
              >
                {p++}:{" "}
                {unit.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )}
              </div>
            )}
          </div>
        );
      });
  };

  return (
    <>
      <div className="topic-unit-name-total-ques-score-container">
        
        <div className="selected-topic-unit-container">
          <p>
            Topic :
            <span style={{ color: "#A935F0" }}>
              {props.topicName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              )}
            </span>
          </p>
          <p>
            {" "}
            Unit :
            <span style={{ color: "#AD50E7" }}>
              {props.unitName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              )}
            </span>
          </p>
        </div>

        <div className="total-ques-score-container">
          <p>
            Total Ques :{" "}
            <span style={{ color: "#F12E07" }}>
              {loadedQuesAns && loadedQuesAns.length}
            </span>
          </p>
          {!resetDisable && (
            <p>
              Score :
              <span>
                <span style={{ color: "#086E11" }}>{score}</span> out of{" "}
                <span style={{ color: "red" }}>{count}</span>
              </span>
            </p>
          )}
        </div>
      </div>
      {/* } */}

      <div className="questions-topic-unit-selction-container">
        <div
          className="questions-container"
          style={{
            display:
              isMobile && props.showTopicsUnitsContainerSmallDevice
                ? "none"
                : isMobile && !props.showTopicsUnitsContainerSmallDevice
                ? "flex"
                : "flex",
          }}
        >
          {props.quesAnsIsLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                <CircularProgress color="success" />
              </Stack>
            </div>
          )}

          {(props.showTopicsUnitsContainer === false || isMobile) &&
            loadedQuesAns && (
              <div
                className="show-topics-units-button-container"
                style={{
                  display:
                    isMobile && props.showTopicsUnitsContainerSmallDevice
                      ? "none"
                      : isMobile &&
                        !props.showTopicsUnitsContainerSmallDevice &&
                        "flex",
                }}
              >
                <div
                  className="show-topics-units-button"
                  onClick={props.showTopicsUnitsContainerHandler}
                >
                  <div
                    className="left-arrow-container"
                    onMouseEnter={showContentTextHandler}
                    onMouseLeave={closeContentTextHandler}
                  >
                    {isMobile ? <FcFilledFilter /> : <FaArrowLeft />}
                  </div>
                  {showContentText === true && (
                    <div
                      className="content-text-container"
                      onMouseEnter={showContentTextHandler}
                      onMouseLeave={closeContentTextHandler}
                    >
                      Course Content
                    </div>
                  )}
                </div>
              </div>
            )}

          {loadedQuesAns && !props.quesAnsIsLoading && (
            <div
              className="question-items-container"
              style={loadedQuesAns.length === 0 ? { height: "100%" } : {}}
            >
              {!props.quesAnsIsLoading && loadedQuesAns.length === 0 && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  No Questions added
                </p>
              )}

              {loadedQuesAns.map((quesAns, index) => {
                return (
                  <GetQuesAnsItem
                    quesNo={index + 1}
                    key={quesAns.id}
                    quesAns={quesAns}
                    options={[
                      quesAns.option1,
                      quesAns.option2,
                      quesAns.option3,
                      quesAns.option4,
                    ]}
                    
                    handleOption={optionHandler}
                    resetDisable={resetDisable}
                    showTopicsUnitsContainer={props.showTopicsUnitsContainer}
                    isMobile={isMobile}
                    showTopicsUnitsContainerSmallDevice={
                      props.showTopicsUnitsContainerSmallDevice
                    }
                  />
                );
              })}
            </div>
          )}

          {loadedQuesAns &&
            loadedQuesAns.length > 0 &&
            !props.quesAnsIsLoading && (
              <div
                className="reset-button-container"
                style={
                  props.quesAnsIsLoading
                    ? {
                        backgroundColor: "white",
                        backgroundImage: "none",
                        boxShadow: "none",
                      }
                    : {}
                }
              >
                {loadedQuesAns &&
                  loadedQuesAns.length > 0 &&
                  !props.quesAnsIsLoading &&
                  props.loadedUnits.length > 0 && (
                    <Button
                      reset={true}
                      disabled={resetDisable}
                      onClick={resetHandler}
                    >
                      RESET ALL
                    </Button>
                  )}
              </div>
            )}
        </div>

        {props.loadedTopics && props.showTopicsUnitsContainer && (
          <div
            className="content-topics-unit-container"
            style={{
              display:
                props.isMobile && props.showTopicsUnitsContainerSmallDevice
                  ? "flex"
                  : props.isMobile &&
                    !props.showTopicsUnitsContainerSmallDevice &&
                    "none",
            }}
          >
            <div className="content-container">
              <div className="course-content-container">Course Content</div>
              <div
                className="content-close-icon-container"
                onClick={props.closeTopicsUnitsContainerHandler}
              >
                <GrClose style={{ cursor: "pointer" }} />
              </div>
            </div>

            <div className="main-topic-units-container">
              {props.loadedTopics.map((topic, topicIndex) => {
                return (
                  <div className="topics-units-container" key={topic.id}>
                    <div
                      className="topic"
                      onClick={() => {
                        props.showUnitsHandler(topic.id);
                      }}
                    >
                      <div className="topic-name">
                        Section {topicIndex + 1} :{" "}
                        {topic.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                          letter.toUpperCase()
                        )}
                      </div>

                      <div className="drpdwn-arrow">
                        <MdKeyboardArrowDown
                          className={
                            topic.isTouched ? "rotate-180" : "rotate-360"
                          }
                        />
                      </div>
                    </div>

                    <div className="units-container">
                      {loadUnitsHandler(topic)}
                      {units}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GetQuesAnsList;
