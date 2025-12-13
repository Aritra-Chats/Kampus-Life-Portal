import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { FunctionsContext } from '../context/functionsContext'

const NavTab = () => {
    const { tab, dispatch } = useContext(FunctionsContext);
    const switchTab = (tab) => {
        switch (tab) {
            case 'TeacherList':
                dispatch({ type: 'SET_TAB', payload: 'teacherList' });
                break;
            case 'StudentList':
                dispatch({ type: 'SET_TAB', payload: 'studentList' });
                break;
            case 'TeacherRoutine':
                dispatch({ type: 'SET_TAB', payload: 'teacherRoutine' });
                break;
            case 'StudentRoutine':
                dispatch({ type: 'SET_TAB', payload: 'studentRoutine' });
                break;
            default:
                console.log({error: "Invalid option"});
                break;
        }
    }

    return (
        <div className = 'NavTab'>
            <Link to='/'>
                <img src ='/images/logo.png' alt='Kampus Life Home redirect' />
            </Link>
            <div className = 'tabOptions'>
                <h6>Details List</h6>
                <div className={`option ${tab === 'teacherList' ? 'selected' : ''}`} onClick={() => switchTab('TeacherList')}>Teacher List</div>
                <div className={`option ${tab === 'studentList' ? 'selected' : ''}`} onClick={() => switchTab('StudentList')}>Student List</div>
                <h6>Routine List</h6>
                <div className={`option ${tab === 'teacherRoutine' ? 'selected' : ''}`} onClick={() => switchTab('TeacherRoutine')}>Teacher Routine</div>
                <div className={`option ${tab === 'studentRoutine' ? 'selected' : ''}`} onClick={() => switchTab('StudentRoutine')}>Student Routine</div>
            </div>
        </div>
    )
}

export default NavTab;