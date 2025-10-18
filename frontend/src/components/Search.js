import { useState } from 'react';

const Search = ({ tab, dispatch, API_URL }) => {
    const [roll, setRoll] = useState('');
    const handleSearch = async (e) => {
        e.preventDefault();
        if(roll.trim() === '') {
            const apiMap = {
                teacherList: `${API_URL}/api/TeacherList`,
                studentList: `${API_URL}/api/StudentList`,
                teacherRoutine: `${API_URL}/api/TeacherRoutine`,
                studentRoutine: `${API_URL}/api/StudentRoutine`
            }
            const response = await fetch(apiMap[tab]);
            if(!response.ok) return console.log(tab, ": fetch error");
            const json = await response.json();
            const actionMap = {
                teacherList: 'GET_TEACHER_LIST',
                studentList: 'GET_STUDENT_LIST',
                teacherRoutine: 'GET_TEACHER_ROUTINE',
                studentRoutine: 'GET_STUDENT_ROUTINE'
            }
            dispatch({ type: actionMap[tab], payload: json });
        } else {
            const apiMap = {
                teacherList: `${API_URL}/api/TeacherList`,
                studentList: `${API_URL}/api/StudentList`,
                teacherRoutine: `${API_URL}/api/TeacherRoutine`,
                studentRoutine: `${API_URL}/api/StudentRoutine`,
            }
            const response = await fetch(apiMap[tab]);
            if(!response.ok) return console.log(tab, ": fetch error");
            const json = await response.json();
            const searchActionMap = {
                teacherList: 'SEARCH_TEACHER_DETAILS',
                studentList: 'SEARCH_STUDENT_DETAILS',
                teacherRoutine: 'SEARCH_TEACHER_ROUTINES',
                studentRoutine: 'SEARCH_STUDENT_ROUTINES',
            }
            dispatch({ type: searchActionMap[tab], payload: { json, roll } });
        }
    }

    return (
        <form className="Search" onSubmit={handleSearch}>
            <input 
                type='number'
                className='searchInput'
                value={roll}
                onChange={((e) => setRoll(e.target.value))}
                placeholder='Roll No.'
            />
            <button type='submit' className='searchButton'>
                <span className='material-symbols-outlined'>search</span> 
            </button>  
        </form>
    );
};

export default Search;