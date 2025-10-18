
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FunctionsContext } from '../context/functionsContext';
import '../styles/home.css';

const Home = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(FunctionsContext);
    
    const switchPage = (page, tab) => {
        switch (tab) {
            case 'teacherList':
                dispatch({ type: 'SET_TAB', payload: 'teacherList' });
                break;
            case 'studentList':
                dispatch({ type: 'SET_TAB', payload: 'studentList' });
                break;
            case 'teacherRoutine':
                dispatch({ type: 'SET_TAB', payload: 'teacherRoutine' });
                break;
            case 'studentRoutine':
                dispatch({ type: 'SET_TAB', payload: 'studentRoutine' });
                break;
            default:
                console.log('Invalid Selection');
        }
        navigate(page);
    };

    return (
        <div className='home'>
            <img src='/images/logo.png' alt='Kampus Life logo'/>
            <div className='options'>
                <button onClick={() => switchPage('/Activity', 'teacherList')}>Teacher List</button>
                <button onClick={() => switchPage('/Activity', 'studentList')}>Student List</button>
                <button onClick={() => switchPage('/Activity', 'teacherRoutine')}>Teacher Routine</button>
                <button onClick={() => switchPage('/Activity', 'studentRoutine')}>Student Routine</button>
            </div>
        </div>
    )
};

export default Home;