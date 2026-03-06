import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FunctionsContext } from "../context/functionsContext";
import "../styles/activities.css";

// components
import NavTab from "../components/NavTab";
import CurrentTab from "../components/CurrentTab";
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
    routine,
    administration,
    mentors,
    holidays,
    dispatch,
  } = useContext(FunctionsContext);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!tab) navigate('/Home');
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
          case "routine":
            response = await fetch(`${API_URL}/api/Routine`);
            break;
          case "administration":
            response = await fetch(`${API_URL}/api/AdministrationList`);
            break;
          case "mentors":
            response = await fetch(`${API_URL}/api/MentorsList`);
            break;
          case "holidays":
            response = await fetch(`${API_URL}/api/HolidayList`);
            break;
          default:
            console.log("Activities: Invalid tab");
            return;
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
          case "routine":
            dispatch({ type: "GET_ROUTINE", payload: json });
            break;
          case "administration":
            dispatch({ type: "GET_ADMINISTRATION", payload: json });
            break;
          case "mentors":
            dispatch({ type: "GET_MENTORS", payload: json });
            break;
          case "holidays":
            dispatch({ type: "GET_HOLIDAYS", payload: json });
            break;
          default:
            console.log("Activities: Invalid tab for dispatch");
        }
      } catch (e) {
        console.log("error: ", e.message);
      }
    };

    if (tab) {
      selectFetch();
    }
  }, [tab, dispatch]);

  const selectDetails = () => {
    switch (tab) {
      case "teacherList":
        return (
          <div className="TeacherList">
            {teacherList && teacherList.length > 0 ? (
              teacherList.map((teacherDetails) => (
                <CurrentDetails
                  key={teacherDetails._id}
                  details={teacherDetails}
                  API_URL={API_URL}
                />
              ))
            ) : (
              <p className="no-data">No teachers found</p>
            )}
          </div>
        );
        
      case "studentList":
        return (
          <div className="StudentList">
            {studentList && studentList.length > 0 ? (
              studentList.map((studentDetails) => (
                <CurrentDetails
                  key={studentDetails._id}
                  details={studentDetails}
                  API_URL={API_URL}
                />
              ))
            ) : (
              <p className="no-data">No students found</p>
            )}
          </div>
        );
        
      case "routine":
        return (
          <div className="Routines">
            {routine && routine.length > 0 ? (
              routine.map((routineDetails) => (
                <CurrentDetails
                  key={routineDetails._id}
                  details={routineDetails}
                  API_URL={API_URL}
                />
              ))
            ) : (
              <p className="no-data">No routines found</p>
            )}
          </div>
        );
        
      case "administration":
        return (
          <div className="AdministrationList">
            {administration && administration.length > 0 ? (
              administration.map((adminDetails) => (
                <CurrentDetails
                  key={adminDetails._id}
                  details={adminDetails}
                  API_URL={API_URL}
                />
              ))
            ) : (
              <p className="no-data">No administration data found</p>
            )}
          </div>
        );
        
      case "mentors":
        return (
          <div className="MentorsList">
            {mentors && mentors.length > 0 ? (
              mentors.map((mentorDetails) => (
                <CurrentDetails
                  key={mentorDetails._id}
                  details={mentorDetails}
                  API_URL={API_URL}
                />
              ))
            ) : (
              <p className="no-data">No mentors found</p>
            )}
          </div>
        );
        
      case "holidays":
        return (
          <div className="HolidaysList">
            {holidays && holidays.length > 0 ? (
              holidays.map((holidayDetails) => (
                <CurrentDetails
                  key={holidayDetails._id}
                  details={holidayDetails}
                  API_URL={API_URL}
                />
              ))
            ) : (
              <p className="no-data">No holidays found</p>
            )}
          </div>
        );
        
      default:
        console.log("Invalid Selection");
        return (
          <div className="InvalidTab">
            <h1>Invalid Tab Selected</h1>
            <p>Please select a valid option from the navigation menu</p>
          </div>
        );
    }
  };

  return (
    <div className="activity">
      <img className="bg-image" src='/images/bg.gif' alt="Background" />
      <NavTab />
      <CurrentTab API_URL={API_URL} />
      <DisplayDetails
        tab={tab}
        dispatch={dispatch}
        selectDetails={selectDetails}
      />
    </div>
  );
};

export default Activity;