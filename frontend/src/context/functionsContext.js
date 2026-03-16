import { createContext, useReducer } from "react";

export const FunctionsContext = createContext();

export const functionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TAB':
            return {
                ...state,
                tab: action.payload
            };
        
        // Teacher List cases
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
        
        // Routine cases
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
        
        // Student List cases
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
        
        // Administration cases
        case 'GET_ADMINISTRATION':
            return {
                ...state,
                administrationList: action.payload
            };
        case 'ADD_ADMINISTRATION_DETAILS':
            return {
                ...state,
                administrationList: [action.payload, ...state.administrationList]
            };
        case 'SET_ADMINISTRATION':
            return {
                ...state,
                administrationList: action.payload
            };
        case 'DELETE_ADMINISTRATION_DETAILS':
            return {
                ...state,
                administrationList: state.administrationList.filter(
                    (ad) => ad._id !== action.payload._id
                )
            };
        
        // Mentors cases
        case 'GET_MENTORS':
            return {
                ...state,
                mentorList: action.payload
            };
        case 'ADD_MENTOR_DETAILS':
            return {
                ...state,
                mentorList: [action.payload, ...state.mentorList]
            };
        case 'SET_MENTORS':
            return {
                ...state,
                mentorList: action.payload
            };
        case 'SEARCH_MENTORS':
            return {
                ...state,
                mentorList: action.payload.json.filter((j) => 
                    j.mentorId?.toString().includes(action.payload.id?.toString()) || 
                    j.menteeId?.toString().includes(action.payload.id?.toString())
                )
            };
        case 'DELETE_MENTOR_DETAILS':
            return {
                ...state,
                mentorList: state.mentorList.filter((m) => m._id !== action.payload._id)
            };
        
        // Holidays cases
        case 'GET_HOLIDAYS':
            return {
                ...state,
                holidayList: action.payload
            };
        case 'ADD_HOLIDAY_DETAILS':
            return {
                ...state,
                holidayList: [action.payload, ...state.holidayList]
            };
        case 'SET_HOLIDAYS':
            return {
                ...state,
                holidayList: action.payload
            };
        case 'SEARCH_HOLIDAYS':
            if (action.payload && action.payload.json) {
                return {
                    ...state,
                    holidayList: action.payload.json.filter((j) => 
                        j.event && j.event.toLowerCase().includes((action.payload.event || '').toLowerCase())
                    )
                };
            }
            return state;
        case 'DELETE_HOLIDAY_DETAILS':
            return {
                ...state,
                holidayList: state.holidayList.filter((h) => h._id !== action.payload._id)
            };
        
        // ANNOUNCEMENTS CASES - ADD THESE
        case 'GET_ANNOUNCEMENTS':
            return {
                ...state,
                announcements: action.payload
            };
        case 'ADD_ANNOUNCEMENT':
            return {
                ...state,
                announcements: [action.payload, ...state.announcements]
            };
        case 'SET_ANNOUNCEMENTS':
            return {
                ...state,
                announcements: action.payload
            };
        case 'DELETE_ANNOUNCEMENT':
            return {
                ...state,
                announcements: state.announcements.filter((a) => a._id !== action.payload._id)
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
        administrationList: null,
        mentorList: null,
        holidayList: [],
        announcements: [] // ADD THIS
    });

    return (
        <FunctionsContext.Provider value={{...state, dispatch}}>
            { children }
        </FunctionsContext.Provider>
    )
}