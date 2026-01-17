import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { FunctionsContext } from '../context/functionsContext'
import GlassSurface from './GlassSurface';
import { useNavigate } from 'react-router-dom';

const NavTab = () => {
    const { tab, dispatch } = useContext(FunctionsContext);
    const [userid, setUserID] = useState('');
    const [designation, setDesignation] = useState('');
    const [optionsOpened, setOptionsOpened] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

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
            </div>
            
            {/* ========== ADDED USER PANEL HERE (OUTSIDE tabOptions) ========== */}
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

export default NavTab;