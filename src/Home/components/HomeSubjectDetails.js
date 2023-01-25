import React, { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useFetchMyCreatedTopics } from "../../Shared/components/Hooks/useFetchMyCreatedTopics";
import { useSaveMyFav } from "../../Shared/components/Hooks/useSaveMyFav.js";
import { useGetUserByUserId } from "../../Shared/components/Hooks/useGetUserByUserId";
import { AuthContext } from "../../Shared/components/Context/auth-context.js";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import LoadingSpinner from "../../Shared/components/UIComponents/LoadingSpinner";
import Button from "../../Shared/components/FormElements/Button.js";
import Auth from "../../User/pages/Auth.js";
import { useAddFavIdsToUser } from "../../Shared/components/Hooks/useAddFavIdsTouser";
import Backdrop from "../../Shared/components/UIComponents/Backdrop";


import "./HomeSubjectDetails.css";


const HomeSubjectDetails = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [
    topicIsLoading,
    topicError,
    topicClearError,
    fetchCreatedTopics,
    loadedCreatedTopics,
  ] = useFetchMyCreatedTopics();
  const [favIsLoading, favError, favClearError, addFavIds] =
    useAddFavIdsToUser();
  const [
    isSaveSubLoading,
    saveSubError,
    saveSubClearError,
    saveSub,
    openAuth,
    saveSubjects,
  ] = useSaveMyFav();
  const [isLoading, error, clearError, fetchUserByUserId, loadedUser] =
    useGetUserByUserId();
  const [saveSubject, setSaveSubject] = useState([]);
  const [saveSubs, setSaveSubs] = useState([]);
  const [authIsLoading, setAuthIsLoading] = useState();

  const getCreatedTopicsAndFetchUser = useCallback(() => {
    fetchCreatedTopics(props.subId);
    if (auth.token) {
      fetchUserByUserId(auth.token);
    }
  }, [auth.token, fetchCreatedTopics, fetchUserByUserId, props.subId]);

  useEffect(() => {
    let fetchTopicsAndUser;
    fetchTopicsAndUser = getCreatedTopicsAndFetchUser();

    return fetchTopicsAndUser;
  }, [getCreatedTopicsAndFetchUser]);

  useEffect(() => {
    if (loadedUser) {
      setSaveSubs(loadedUser.saveSubjectsIds);
    }
  }, [loadedUser]);

  const { handleFavLoading } = props;

  useEffect(() => {
    handleFavLoading(favIsLoading);
  }, [handleFavLoading, favIsLoading]);

  const storeFavSubHandler = (favId) => {
    addFavIds(favId);
  };
  const gotoFavHandler = () => {
    history.push("/myFav");
  };

  const goToSubjectHandler = (subId) => {
    history.push("/getTopics", { subId });
  };

  const saveSubjectHandler = (subId) => {
    let saveSubject = [];
    saveSubject.push(subId);
    setSaveSubject(saveSubject);
    saveSubjects(openAuth, saveSubject);
  };

  let errorMsg, clearErrorMsg;

  if (topicError) {
    errorMsg = topicError;
    clearErrorMsg = topicClearError;
  } else if (favError) {
    errorMsg = favError;
    clearErrorMsg = favClearError;
  } else if (saveSubError) {
    errorMsg = saveSubError;
    clearErrorMsg = saveSubClearError;
  } else if (error) {
    errorMsg = error;
    clearErrorMsg = clearError;
  }

  const handleAuthenticate = (isLoading) => {
    setAuthIsLoading(isLoading);
  };

  const openTopicQuestionHandler = (subId, topicId, topicName, subName) => {
    history.push("/getTopics", {
      subId,
      topicId,
      topicName,
      subName,
    });
  };

  return (
    <>
      {openAuth ? (
        <Auth
          save={true}
          isLoggedIn={true}
          saveSubject={saveSubject}
          authenticateHandler={handleAuthenticate}
          authIsLoading={authIsLoading}
          closeAuthHandler={props.cancel}
        />
      ) : (
        <>
          <Backdrop cancel={props.cancel} />
          <div className="topics-container box-shadow">
            <div className="topic-details-heading-container">
              {props.subName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              )}
            </div>

            {errorMsg && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error" onClear={clearErrorMsg}>
                  <AlertTitle>Error</AlertTitle>
                  This is an error alert — <strong>{errorMsg}</strong>
                </Alert>
              </Stack>
            )}

            {errorMsg === undefined && (
              <>
                <div className="topic-details-container">
                  {topicIsLoading && <LoadingSpinner />}
                  {loadedCreatedTopics && loadedCreatedTopics.length === 0 && (
                    <p>No Topics Added Till Now</p>
                  )}
                  {loadedCreatedTopics &&
                    loadedCreatedTopics.length > 0 &&
                    loadedCreatedTopics.map((topic) => {
                      return (
                        <div
                          key={topic.id}
                          className="topic-container box-shadow"
                          onClick={() => {
                            openTopicQuestionHandler(
                              props.subId,
                              topic.id,
                              topic.name,
                              props.subName
                            );
                          }}
                        >
                          <div className="topic-name-container">
                            {topic.name.replace(
                              /(^\w{1})|(\s+\w{1})/g,
                              (letter) => letter.toUpperCase()
                            )}
                          </div>
                          <div className="topic-ques-container">
                            {topic.quesAnsIds.length === 0 ? (
                              <span style={{ color: "red" }}>
                                No Questions Added
                              </span>
                            ) : (
                              topic.quesAnsIds.length
                            )}

                            {topic.quesAnsIds.length === 1 && " Question"}
                            {topic.quesAnsIds.length > 1 && " Questions"}
                          </div>
                        </div>
                      );
                    })}
                </div>

                {loadedCreatedTopics && loadedCreatedTopics.length > 0 && (
                  <div className="fav-goto-btn-container">
                    {!auth.favSubjectsIds.includes(props.subId) &&
                      !saveSubs.includes(props.subId) &&
                      !favIsLoading &&
                      !isSaveSubLoading && (
                        <>
                          <Button
                            addToFav={true}
                            onClick={() => storeFavSubHandler(props.subId)}
                          >
                            ADD TO FAVOURITE
                          </Button>

                          <Button
                            saveToPro={true}
                            onClick={() => saveSubjectHandler(props.subId)}
                          >
                            SAVE TO PROFILE
                          </Button>
                        </>
                      )}
                    {favIsLoading && (
                      <Button disabled={favIsLoading}>ADDING.....</Button>
                    )}

                    {saveSub && isSaveSubLoading && (
                      <Button disabled={isSaveSubLoading}>SAVING.....</Button>
                    )}
                    {auth.favSubjectsIds.includes(props.subId) && (
                      <Button
                        disabled={favIsLoading}
                        goToFav={true}
                        onClick={() => gotoFavHandler()}
                      >
                        GO TO FAVOURITES
                      </Button>
                    )}

                    {saveSubs && saveSubs.includes(props.subId) && !isLoading && (
                      <Button
                        goToSub={true}
                        style={{
                          backgroundColor: "green",
                          borderColor: "green",
                        }}
                        onClick={() => {
                          goToSubjectHandler(props.subId);
                        }}
                      >
                        GO TO THE SUBJECT
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default HomeSubjectDetails;
