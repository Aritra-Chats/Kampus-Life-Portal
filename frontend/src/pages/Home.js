
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FunctionsContext } from '../context/functionsContext';
import GlassSurface from '../components/GlassSurface';
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
            <img className="Background" src='/images/bg.gif' alt="Background"/>
            <GlassSurface className='Panel' width={'500px'} height={'700px'} borderRadius={10} opacity={0.5} blur={5} >
                <div className='Logo'>
                    <img src='/images/logo.png' alt='Kampus Life logo'/>
                </div>
                <div className='Options'>
                    <button className='Option' onClick={() => switchPage('/Activity', 'teacherList')}>Teacher List</button>
                    <button className='Option' onClick={() => switchPage('/Activity', 'studentList')}>Student List</button>
                    <button className='Option' onClick={() => switchPage('/Activity', 'teacherRoutine')}>Teacher Routine</button>
                    <button className='Option' onClick={() => switchPage('/Activity', 'studentRoutine')}>Student Routine</button>
                </div>
            </GlassSurface>
        </div>
    )
};

export default Home;