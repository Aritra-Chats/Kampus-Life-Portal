import { createContext, useReducer } from "react";

export const FunctionsContext = createContext();

export const functionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TAB':
            return {
                ...state,
                tab: action.payload
            };
        case 'GET_TEACHER_LIST':
            return {
                ...state,
                teacherList: action.payload
            };
        case 'ADD_TEACHER_DETAILS':
            return {
                ...state,
                teacherList: [action.payload, ...state.teacherList]
            };
        case 'SET_TEACHER_LIST':
            return {
                ...state, 
                teacherList: action.payload
            };
        case 'SEARCH_TEACHER_DETAILS':
            return {
                ...state,
                teacherList: action.payload.json.filter((j) => j.roll.toString().includes(action.payload.roll.toString()))
            };
        case 'DELETE_TEACHER_DETAILS':
            return {
                ...state,
                teacherList: state.teacherList.filter((tl) => tl._id !== action.payload._id)
            };
        case 'GET_TEACHER_ROUTINE':
            return {
                ...state,
                teacherRoutine: action.payload
            };
        case 'ADD_TEACHER_ROUTINE':
            return {
                ...state,
                teacherRoutine: [action.payload, ...state.teacherRoutine]
            };
        case 'SET_TEACHER_ROUTINE':
            return {
                ...state, 
                teacherRoutine: action.payload
            };
        case 'SEARCH_TEACHER_ROUTINES':
            return {
                ...state,
                teacherRoutine: action.payload.json.filter((j) => j.roll.toString().includes(action.payload.roll.toString()))
            };
        case 'DELETE_TEACHER_ROUTINE':
            return {
                ...state,
                teacherRoutine: state.teacherRoutine.filter((tr) => tr._id !== action.payload._id)
            };
        case 'GET_STUDENT_LIST':
            return {
                ...state,
                studentList: action.payload
            };
        case 'ADD_STUDENT_DETAILS':
            return {
                ...state,
                studentList: [action.payload, ...state.studentList]
            };
        case 'SET_STUDENT_DETAILS':
            return {
                ...state, 
                studentList: action.payload
            };
        case 'SEARCH_STUDENT_DETAILS':
            return {
                ...state,
                studentList: action.payload.json.filter((j) => j.roll.toString().includes(action.payload.roll.toString()))
            };
        case 'DELETE_STUDENT_DETAILS':
            return {
                ...state,
                studentList: state.studentList.filter((sl) => sl._id !== action.payload._id)
            };
        case 'GET_STUDENT_ROUTINE':
            return {
                ...state,
                studentRoutine: action.payload
            };
        case 'ADD_STUDENT_ROUTINE':
            return {
                ...state,
                studentRoutine: [action.payload, ...state.studentRoutine]
            };
        case 'SET_STUDENT_ROUTINE':
            return {
                ...state, 
                studentRoutine: action.payload
            };
        case 'SEARCH_STUDENT_ROUTINES':
            return {
                ...state,
                studentRoutine: action.payload.json.filter((j) => j.roll.toString().includes(action.payload.roll.toString()))
            };
        case 'DELETE_STUDENT_ROUTINE':
            return {
                ...state,
                studentRoutine: state.studentRoutine.filter((sr) => sr._id !== action.payload._id)
            };
        default:
            console.log("Invalid case");
    }
}

export const FunctionsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(functionsReducer, {
        tab: 'teacherList',
        teacherList: null,
        teacherRoutine: null,
        studentList: null,
        studentRoutine: null
    });

    return (
        <FunctionsContext.Provider value={{...state, dispatch}}>
            { children }
        </FunctionsContext.Provider>
    )

}