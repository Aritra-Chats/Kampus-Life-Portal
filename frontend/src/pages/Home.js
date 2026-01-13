
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FunctionsContext } from '../context/functionsContext';
import GlassSurface from '../components/GlassSurface';
import '../styles/home.css';

const Home = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(FunctionsContext);
    const [userid, setUserID] = useState('');
    const [designation, setDesignation] = useState('');
    const [optionsOpened, setOptionsOpened] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${API_URL}/auth/user-info`, {
                method: 'GET',
                credentials: 'include'
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUserID(userData.userid);
                    setDesignation(userData.designation);
                }
            } catch (err) {
                console.error('Error fetching user info:', err.message);
            }
        };
        fetchUserInfo();
    }, [API_URL]);
    
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
            case 'announcements':
                dispatch({ type: 'SET_TAB', payload: 'announcements' });
                break;
            default:
                console.log('Invalid Selection');
        }
        navigate(page);
    };

    const userOptions = () => {
        if(optionsOpened === true) {
            setOptionsOpened(false);
        } else {
            setOptionsOpened(true);
        }
    }

    return (
        <div className='home'>
            <img className="Background" src='/images/bg.gif' alt="Background"/>
            <GlassSurface className='Panel' width={'450px'} height={'650px'} borderRadius={20} opacity={0.5} blur={5} >
                <img className='Logo' src='/images/logo.png' alt='Kampus Life logo'/>
                {designation === 'management' && (
                    <>
                    <button className='Option' onClick={() => switchPage('/Activity', 'teacherList')}>Faculty List</button>
                    <button className='Option' onClick={() => switchPage('/Activity', 'studentList')}>Student List</button>
                    <button className='Option' onClick={() => switchPage('/Activity', 'teacherRoutine')}>Faculty Routine</button>
                    <button className='Option' onClick={() => switchPage('/Activity', 'studentRoutine')}>Student Routine</button> 
                    </> )
                } 
                {designation === 'official' && (
                    <button className='Option' onClick={() => switchPage('/Official', 'announcements')}>Announcements</button>)
                }
            </GlassSurface>
            <GlassSurface className='UserPanel' width={'300px'} height={'75px'} borderRadius={60} opacity={0.5} blur={5}>
                <div className='UserInfo' onClick={userOptions}>
                    Hello,<br/>
                    {userid || 'Loading...'} {designation && `(${designation})`}
                </div>
            </GlassSurface>
            {optionsOpened && (
                <GlassSurface className='UserOptions' width={'300px'} height={'275px'} borderRadius={20} opacity={0.5} blur={5}>
                    <div className='UserDetails'>
                        Hello,<br/>
                        {userid || 'Loading...'} {designation && `(${designation})`}
                    </div>
                    <button className='LogoutButton' onClick={async () => {
                        try {
                            const response = await fetch(`${API_URL}/auth/logout`, {
                                method: 'POST',
                                credentials: 'include'
                            });
                            if (response.ok)
                                navigate('/Login');
                        } catch (err) {
                            console.error('Error logging out:', err.message);
                        }
                    }}>
                        <span className="material-symbols-outlined">logout</span>
                        Logout
                    </button>
                </GlassSurface>
            )}
        </div>
    )
};

export default Home;