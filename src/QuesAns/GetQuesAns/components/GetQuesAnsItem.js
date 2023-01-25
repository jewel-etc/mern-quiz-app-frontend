import React, { useState, useEffect, useCallback } from "react";
import MathView from "react-math-view";
import "./GetQuesAnsItem.css";

const GetQuesAnsItem = (props) => {
  const [indx, setIndx] = useState();
  const [error, setError] = useState();
  const [show, setShow] = useState(false);
  const [alreadyOpen, setAlreadyOpen] = useState(false);
  const [alreadyClose, setAlreadyClose] = useState(false);
  const [animatedOpen, setAnimatedOpen] = useState(false);
  const [animatedClose, setAnimatedClose] = useState(false);
  const [showRightWrongExplainContainer, setShowRightWrongExplainContainer] =
    useState(false);

  const [mediumScreenOptionStyle, setMediumScreenOptionStyle] = useState(
    window.innerWidth <= 1200 && window.innerWidth > 1000
  );

  const [tabScreenOptionStyle, setTabScreenOptionStyle] = useState(
    window.innerWidth <= 1000 && window.innerWidth > 400
  );

  const [smallScreenOptionStyle, setSmallScreenOptionStyle] = useState(
    window.innerWidth <= 400
  );

  const callback = useCallback(() => {
    const medium_screen_option_style =
      window.innerWidth <= 1200 && window.innerWidth > 1000;

    const tab_screen_option_style =
      window.innerWidth <= 1000 && window.innerWidth > 400;

    const small_screen_option_style = window.innerWidth <= 400;

    if (medium_screen_option_style !== mediumScreenOptionStyle)
      setMediumScreenOptionStyle(medium_screen_option_style);

    if (tab_screen_option_style !== tabScreenOptionStyle)
      setTabScreenOptionStyle(tab_screen_option_style);

    if (small_screen_option_style !== smallScreenOptionStyle)
      setSmallScreenOptionStyle(small_screen_option_style);
  }, [mediumScreenOptionStyle, smallScreenOptionStyle, tabScreenOptionStyle]);

  useEffect(() => {
    window.addEventListener("resize", callback);

    return () => window.removeEventListener("resize", callback);
  }, [callback, props.resetDisable]);

  let updatedQuestion;

  if (props.quesAns.question.includes("begin{equation*}")) {
    updatedQuestion = props.quesAns.question;
  }

  let style, optionsContainerStyle, optionWidth;

  if (props.showTopicsUnitsContainer && mediumScreenOptionStyle) {
    optionsContainerStyle = {
      flexWrap: "wrap",
      justifyContect: "space-around",
    };
    style = {
      width: "48%",
    };
    optionWidth = "48%";
  } else if (!props.showTopicsUnitsContainer && mediumScreenOptionStyle) {
    optionsContainerStyle = {};
    style = {
      width: "50%",
    };
    optionWidth = "50%";
  } else if (tabScreenOptionStyle) {
    optionsContainerStyle = {};
    style = {
      width: "100%",
    };
    optionWidth = "100%";
  } else if (smallScreenOptionStyle) {
    optionWidth = "100%";
    style = {
      width: "100%",
    };
  }

  const selectedOptionHandler = (option, index) => {
    if (props.quesAns.isTouched && option === props.quesAns.correctOption) {
      style = {
        backgroundColor: "green",
        color: "white",
        cursor: "not-allowed",
        width: optionWidth,
      };
    } else if (
      props.quesAns.isTouched &&
      index === indx &&
      props.options[indx] !== props.quesAns.correctOption
    ) {
      style = {
        backgroundColor: "red",
        color: "white",
        cursor: "not-allowed",
        width: optionWidth,
      };
    } else if (props.quesAns.isTouched) {
      style = {
        cursor: "not-allowed",
        color: "#979797",
        borderColor: "#ccc",
        width: optionWidth,
      };
    }
  };

  const selectOptionHandler = (index, option, correct) => {
    console.log("option : ", option);
    console.log("correct : ", correct);
    setIndx(index);
    setShow(true);
    setShowRightWrongExplainContainer(true);
    setAnimatedOpen(true);
    setAlreadyOpen(false);
    setAnimatedClose(false);
    setAlreadyClose(false);

    if (option === correct) {
     
      setError(false);
    } else {
      
      setError(true);
    }
  };

  useEffect(() => {
    
    if (props.resetDisable && alreadyOpen && showRightWrongExplainContainer) {
      setShowRightWrongExplainContainer(false);
      setAnimatedClose(true);
     
    }
    if (!showRightWrongExplainContainer && props.resetDisable) {
      setAlreadyOpen(false);
    }
    if (
      props.resetDisable &&
      props.isMobile &&
      props.showTopicsUnitsContainerSmallDevice
    ) {
      setError(undefined);
    }
  }, [
    props.resetDisable,
    alreadyOpen,
    showRightWrongExplainContainer,
    props.isMobile,
    props.showTopicsUnitsContainerSmallDevice,
    error,
  ]);

  let questionItemContainer;

  if (error && props.quesAns.isTouched) {
   

    questionItemContainer = "question-item-container-wrong";
  }
  if (!error && props.quesAns.isTouched) {
    questionItemContainer = "question-item-container-right";
  }
  if (error && !props.quesAns.isTouched) {
    questionItemContainer = "question-item-container-wrong-to-normal";
  }
  if (!error && !props.quesAns.isTouched) {
    questionItemContainer = "question-item-container-right-to-normal";
  }
  if (!showRightWrongExplainContainer && error && alreadyOpen) {
    questionItemContainer = "question-item-container-wrong-to-normal";
  }
  if (!showRightWrongExplainContainer && !error && alreadyOpen) {
    questionItemContainer = "question-item-container-right-to-normal";
  }
  if (
    !showRightWrongExplainContainer &&
    !props.quesAns.isTouched &&
    !alreadyOpen &&
    error === undefined
  ) {
    questionItemContainer = "question-item-container";
  }

  useEffect(() => {
    if (animatedOpen) {
      setTimeout(() => {
        setAnimatedOpen(false);
        setAlreadyOpen(true);
      }, 1000);
    }

    if (animatedClose) {
      setTimeout(() => {
        setAlreadyClose(true);
        setAnimatedClose(false);
      }, 1000);
    }
  }, [props.showTopicsUnitsContainer, animatedOpen, animatedClose]);

  let wrongCorrectExplanationContainer;

  if (props.quesAns.explanation.length > 0) {
    if (animatedOpen) {
      wrongCorrectExplanationContainer =
        "wrong-correct-explanation-container-animation-open";
    }
    if (alreadyOpen) {
      wrongCorrectExplanationContainer =
        "wrong-correct-explanation-container-already-open";
    }

    if (animatedClose) {
      wrongCorrectExplanationContainer =
        "wrong-correct-explanation-container-animation-close";
    }

    if (alreadyClose) {
      wrongCorrectExplanationContainer =
        "wrong-correct-explanation-container-already-close";
    }
  } else if (props.quesAns.explanation.length === 0) {
    if (animatedOpen) {
      wrongCorrectExplanationContainer =
        "wrong-correct-explanation-container-animation-open";
    }
    if (alreadyOpen) {
      wrongCorrectExplanationContainer =
        "wrong-correct-explanation-container-already-open";
    }

    if (animatedClose) {
      wrongCorrectExplanationContainer =
        "wrong-correct-explanation-container-animation-close";
    }

    if (alreadyClose) {
      wrongCorrectExplanationContainer =
        "wrong-correct-explanation-container-already-close";
    }
  }

  return (
    <div className={questionItemContainer}>
      <div className="question-description-container">
        {props.quesNo} : {props.quesAns.description}
      </div>

      {updatedQuestion ? (
        <div className="question-container">
          <MathView
            className="math-view-field"
            style={{ marginBottom: "5px", textAlign: "justify" }}
            value={updatedQuestion}
            readOnly={true}
            rows={2}
          />
        </div>
      ) : (
        <textarea
          className="question-container"
          style={{ marginBottom: "5px", textAlign: "justify" }}
          rows={
            props.quesAns.question.split(/\r\n|\r|\n/).length > 1
              ? props.quesAns.question.split(/\r\n|\r|\n/).length
              : 3
          }
          defaultValue={props.quesAns.question}
          readOnly={true}
        />
      )}

      <div className="options-container" style={optionsContainerStyle}>
        {props.options.map((option, index) => {
          selectedOptionHandler(option, index);

          return (
            <div
              className="option-container"
              style={style}
              key={option}
              onClick={() => {
                if (!props.quesAns.isTouched) {
                  selectOptionHandler(
                    index,
                    option,
                    props.quesAns.correctOption
                  );
                  props.handleOption(
                    props.quesAns.id,
                    option,
                    props.quesAns.correctOption
                  );
                }
              }}
            >
              {option.includes("begin{equation*}") ? (
                <MathView
                  value={option}
                  className="math-view-field"
                  style={{ fontFamily: "Times New Roman", cursor: "pointer" }}
                  onFocus={() => {
                    if (!props.quesAns.isTouched) {
                      selectOptionHandler(
                        index,
                        option,
                        props.quesAns.correctOption
                      );
                      props.handleOption(
                        props.quesAns.id,
                        option,
                        props.quesAns.correctOption
                      );
                    }
                  }}
                  readOnly={true}
                  onChange={undefined}
                />
              ) : (
                option
              )}
            </div>
          );
        })}
      </div>
      {show && (
        <div className={wrongCorrectExplanationContainer}>
          {props.options[indx] !== props.quesAns.correctOption && (
            <div
              className={
                props.quesAns.isTouched
                  ? "wrong-container-open"
                  : "wrong-container-close"
              }
              style={{ color: "red" }}
            >
              <p style={{ margin: 0 }}>Oops!! Your are wrong.</p>
            </div>
          )}

          {props.options[indx] === props.quesAns.correctOption && (
            <div
              className={
                props.quesAns.isTouched
                  ? "right-container-open"
                  : "right-container-close"
              }
              style={{ color: "green" }}
            >
              <p style={{ margin: 0 }}>Well done.You are right.</p>
            </div>
          )}

          {props.quesAns.explanation ? (
            <div
              className={
                props.quesAns.isTouched
                  ? "explanation-option-container-open"
                  : "explanation-option-container-close"
              }
            >
              {props.quesAns.explanation.includes("begin{equation*}") ? (
                <p>
                  <span style={{ color: "brown" }}>Explanation :</span>
                  <MathView
                    className="math-view-field math-view-field-explanation"
                    value={` ${props.quesAns.explanation}`}
                    readOnly={true}
                  />
                </p>
              ) : (
                <p>
                  <p
                    style={{
                      color: "brown",
                      margin: "0",
                      marginBottom: "10px",
                    }}
                  >
                    Explanation :
                  </p>

                  {props.quesAns.explanation.length > 0
                    ? props.quesAns.explanation
                    : "No explanation provided"}
                </p>
              )}
            </div>
          ) : (
            <div
              className={
                props.quesAns.isTouched
                  ? "explanation-option-container-open"
                  : "explanation-option-container-close"
              }
            >
              <p>No explanation provided</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default GetQuesAnsItem;
