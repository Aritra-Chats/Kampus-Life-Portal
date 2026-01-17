import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { FunctionsContext } from '../context/functionsContext'
import { useState, useEffect } from 'react';

const NavTab = () => {
    const { tab, dispatch } = useContext(FunctionsContext);
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

    const switchTab = (tab) => {
        switch (tab) {
            case 'TeacherList':
                dispatch({ type: 'SET_TAB', payload: 'teacherList' });
                break;
            case 'StudentList':
                dispatch({ type: 'SET_TAB', payload: 'studentList' });
                break;
            case 'Routine':
                dispatch({ type: 'SET_TAB', payload: 'routine' });
                break;
            default:
                console.log({error: "Invalid option"});
                break;
        }
    }

    const userOptions = () => {
        setOptionsOpened(!optionsOpened);
    }

    return (
        <div className = 'NavTab'>
            <Link to='/Home'>
                <img src ='/images/logo.png' alt='Kampus Life Home redirect' />
            </Link>
            <div className = 'tabOptions'>
                <h6>Details List</h6>
                <div className={`option ${tab === 'teacherList' ? 'selected' : ''}`} onClick={() => switchTab('TeacherList')}>Teacher List</div>
                <div className={`option ${tab === 'studentList' ? 'selected' : ''}`} onClick={() => switchTab('StudentList')}>Student List</div>
                <h6>Routine List</h6>
                <div className={`option ${tab === 'routine' ? 'selected' : ''}`} onClick={() => switchTab('Routine')}>Routine</div>
                
                <div className='UserPanel' onClick={userOptions}>
                    <div className='UserInfo'>
                        Hello,<br/>
                        {userid || 'Loading...'} {designation && `(${designation})`}
                    </div>
                </div>
                
                {optionsOpened && (
                    <div className='UserOptions'>
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
                                    window.location.href = '/Login';
                            } catch (err) {
                                console.error('Error logging out:', err.message);
                            }
                        }}>
                            <span className="material-symbols-outlined">logout</span>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavTab