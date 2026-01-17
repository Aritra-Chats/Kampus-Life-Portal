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
        case 'GET_ROUTINE':  
            return {
                ...state,
                routine: action.payload  
            };
        case 'ADD_ROUTINE':  
            return {
                ...state,
                routine: [action.payload, ...state.routine]  
            };
        case 'SET_ROUTINE':  
            return {
                ...state, 
                routine: action.payload  
            };
        case 'SEARCH_ROUTINES':  
            return {
                ...state,
                routine: action.payload.json.filter((j) => j.roll.toString().includes(action.payload.roll.toString()))
            };
        case 'DELETE_ROUTINE':  
            return {
                ...state,
                routine: state.routine.filter((r) => r._id !== action.payload._id)  
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
   
        default:
            console.log("Invalid case");
            return state;
    }
}

export const FunctionsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(functionsReducer, {
        tab: 'teacherList',
        teacherList: null,
        routine: null,  
        studentList: null,
        
    });

    return (
        <FunctionsContext.Provider value={{...state, dispatch}}>
            { children }
        </FunctionsContext.Provider>
    )
}