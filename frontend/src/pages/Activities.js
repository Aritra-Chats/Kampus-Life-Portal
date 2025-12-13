import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FunctionsContext } from "../context/functionsContext";
import "../styles/activities.css";

// components
import NavTab from "../components/NavTab";
import CurrentTab from "../components/currentTab";
import CurrentDetails from "../components/currentDetails";
import Search from "../components/Search";

const API_URL = process.env.REACT_APP_API_URL;

// display details
const DisplayDetails = ({ tab, dispatch, selectDetails }) => {
  return (
    <div className="DisplayDetails">
      <Search tab={tab} dispatch={dispatch} API_URL={API_URL} />
      {selectDetails()}
    </div>
  );
};

const Activity = () => {
  const {
    tab,
    teacherList,
    studentList,
    teacherRoutine,
    studentRoutine,
    dispatch,
  } = useContext(FunctionsContext);

  const navigate = useNavigate();
  useEffect(() => {
    if(!tab) navigate('/');
  }, [tab, navigate]);

  useEffect(() => {
    const selectFetch = async () => {
      try {
        console.log(API_URL);
        let response;
        switch (tab) {
          case "teacherList":
            response = await fetch(`${API_URL}/api/TeacherList`);
            break;
          case "studentList":
            response = await fetch(`${API_URL}/api/StudentList`);
            break;
          case "teacherRoutine":
            response = await fetch(`${API_URL}/api/TeacherRoutine`);
            break;
          case "studentRoutine":
            response = await fetch(`${API_URL}/api/StudentRoutine`);
            break;
          default:
            console.log("Activities: Invalid tab");
        }
        if (!response.ok) {
          console.log(tab, ": fetch error");
          try {
            const errorJson = await response.json();
            console.log("Error response:", errorJson);
          } catch (e) {
            console.log("Could not parse error response");
          }
          return;
        }
        const json = await response.json();
        switch (tab) {
          case "teacherList":
            dispatch({ type: "GET_TEACHER_LIST", payload: json });
            break;
          case "studentList":
            dispatch({ type: "GET_STUDENT_LIST", payload: json });
            break;
          case "teacherRoutine":
            dispatch({ type: "GET_TEACHER_ROUTINE", payload: json });
            break;
          case "studentRoutine":
            dispatch({ type: "GET_STUDENT_ROUTINE", payload: json });
            break;
          default:
            console.log("Activities: Invalid tab");
        }
      } catch (e) {
        console.log("error: ", e.message);
      }
    };

    selectFetch();
  }, [tab, dispatch]);

  const selectDetails = () => {
    switch (tab) {
      case "teacherList":
        return (
          <div className="TeacherList">
            {teacherList &&
              teacherList.map((teacherDetails) => (
                <CurrentDetails
                  key={teacherDetails._id}
                  details={teacherDetails}
                  API_URL={API_URL}
                />
              ))}
          </div>
        );
      case "studentList":
        return (
          <div className="StudentList">
            {studentList &&
              studentList.map((studentDetails) => (
                <CurrentDetails
                  key={studentDetails._id}
                  details={studentDetails}
                  API_URL={API_URL}
                />
              ))}
          </div>
        );
      case "teacherRoutine":
        return (
          <div className="TeacherRoutines">
            {teacherRoutine &&
              teacherRoutine.map((routineDetails) => (
                <CurrentDetails
                  key={routineDetails._id}
                  details={routineDetails}
                  API_URL={API_URL}
                />
              ))}
          </div>
        );
      case "studentRoutine":
        return (
          <div className="StudentRoutines">
            {studentRoutine &&
              studentRoutine.map((routineDetails) => (
                <CurrentDetails
                  key={routineDetails._id}
                  details={routineDetails}
                  API_URL={API_URL}
                />
              ))}
          </div>
        );
      default:
        console.log("Invalid Selection");
    }
  };

  return (
    <div className="activity">
      <NavTab />
      <CurrentTab API_URL={API_URL}/>
      <DisplayDetails
        tab={tab}
        dispatch={dispatch}
        selectDetails={selectDetails}
      />
    </div>
  );
};

export default Activity;
