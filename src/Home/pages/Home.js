import React, { useEffect, useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useFetchAllSubjects } from "../../Shared/components/Hooks/useFetchAllSubjects.js";
import HomeSubjectsLists from "../components/HomeSubjectsLists.js";
import LoadingSpinner from "../../Shared/components/UIComponents/LoadingSpinner.js";
import ErrorModal from "../../Shared/components/UIComponents/ErrorModal.js";
import { AuthContext } from "../../Shared/components/Context/auth-context.js";
import { useFetchMySaveSub } from "../../Shared/components/Hooks/useFetchMySaveSub.js";
import Paginate from "../../Shared/components/UIComponents/Pagination.js";

import "./Home.css";

const Home = (props) => {
  const [
    isSaveSubLoading,
    saveSubError,
    saveSubClearError,
    fetchSavedSubjects,
    loadedSavedSubjects,
  ] = useFetchMySaveSub();
  const [isLoading, error, clearError, fetchAllSubjects, loadedAllSubjects] =
    useFetchAllSubjects();

  const auth = useContext(AuthContext);

  const getAllAndFetchSubjects = useCallback(() => {
    fetchAllSubjects();

    if (auth.token) {
      fetchSavedSubjects();
    }
  }, [auth.token, fetchAllSubjects, fetchSavedSubjects]);

  useEffect(() => {
    let fetchSubjects;

    fetchSubjects = getAllAndFetchSubjects();

    return fetchSubjects;
  }, [getAllAndFetchSubjects]);

  return (
    <div className="home-container">
      {(isLoading || isSaveSubLoading) && <LoadingSpinner asOverlay />}

      {error && <ErrorModal onClear={clearError} error={error} />}
      {saveSubError && (
        <ErrorModal onClear={saveSubClearError} error={saveSubError} />
      )}

      <div className="image-caption-container box-shadow">
        <div className="caption-container">
          <p style={{ textAlign: "justify", margin: "0" }}>
            Online learning is the future of education, and it is happening
            right now all around us. eLearning, mobile learning ; all of these
            technologies are providing access to information and skills that
            were previously available only to a select few. Now, industry
            leaders, workforce development managers, and educators of all types
            are discovering the vast promise that eLearning holds for the future
            of training delivery, and education in general.
          </p>
        </div>
        <div className="image-container"> </div>
      </div>

      <div className="user-name-subjects-conatiner">
        {loadedSavedSubjects &&
          loadedSavedSubjects.length > 0 &&
          auth.token && (
            <>
              <div className="user-learning-container">
                {`Let's start learning ${auth.name.split(" ")[0]}.....`}
                <NavLink to="/myLearning">My Learning</NavLink>
              </div>

              <Paginate
                loadedSavedSubjects={loadedSavedSubjects.sort((a, b) =>
                  a.name > b.name ? 1 : -1
                )}
              />
            </>
          )}
      </div>
      {loadedAllSubjects && (
        <div
          className="choose-subjets-container"
          style={
            loadedAllSubjects.length === 0 ? { justifyContent: "center" } : {}
          }
        >
          {loadedAllSubjects.length > 0 ? (
            "Choose Subjects To Learn....."
          ) : (
            <span style={{ color: "red" }}>No Subject Added</span>
          )}
        </div>
      )}

      {loadedAllSubjects && loadedAllSubjects.length > 0 && !isLoading && (
        <HomeSubjectsLists
          loadedAllSubjects={loadedAllSubjects.sort((a, b) =>
            a.name > b.name ? 1 : -1
          )}
        />
      )}
    </div>
  );
};

export default Home;
