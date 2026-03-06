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
            case 'Administration':
                dispatch({ type: 'SET_TAB', payload: 'administration' });
                break;
            case 'Mentors':
                dispatch({ type: 'SET_TAB', payload: 'mentors' });
                break;
            case 'Holidays':
                dispatch({ type: 'SET_TAB', payload: 'holidays' });
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
        <div className='NavTab'>
            <Link to='/Home'>
                <img src='/images/logo.png' alt='Kampus Life Home redirect' />
            </Link>
            
            <div className='tabOptions'>
                <h6>DETAILS LIST</h6>
                <div 
                    className={`option ${tab === 'teacherList' ? 'selected' : ''}`} 
                    onClick={() => switchTab('TeacherList')}
                >
                    Teacher List
                </div>
                <div 
                    className={`option ${tab === 'studentList' ? 'selected' : ''}`} 
                    onClick={() => switchTab('StudentList')}
                >
                    Student List
                </div>
                
                <h6>ROUTINE LIST</h6>
                <div 
                    className={`option ${tab === 'routine' ? 'selected' : ''}`} 
                    onClick={() => switchTab('Routine')}
                >
                    Routine
                </div>
                
                <h6>ADMINISTRATION</h6>
                <div 
                    className={`option ${tab === 'administration' ? 'selected' : ''}`} 
                    onClick={() => switchTab('Administration')}
                >
                    Administration
                </div>
                <div 
                    className={`option ${tab === 'mentors' ? 'selected' : ''}`} 
                    onClick={() => switchTab('Mentors')}
                >
                    Mentors
                </div>
                <div 
                    className={`option ${tab === 'holidays' ? 'selected' : ''}`} 
                    onClick={() => switchTab('Holidays')}
                >
                    Holidays
                </div>
            </div>
            
            {/* ===== ONLY ONE USER PANEL - OPTIMIZED VERSION ===== */}
            <div className="user-glass">
                <div className="user-panel" onClick={userOptions}>
                    <div className="user-icon">
                        <span className="material-symbols-outlined">person</span>
                    </div>
                    <div className="user-info">
                        <div className="user-name">{userid || 'User'}</div>
                        <div className="user-designation">{designation || 'Member'}</div>
                    </div>
                </div>
            </div>

            {/* ===== ONLY ONE POPUP - OPTIMIZED VERSION ===== */}
            {optionsOpened && (
                <GlassSurface
                    className="user-options-glass"
                    borderRadius={18}
                    opacity={0.15}
                    blur={16}
                >
                    <div className="UserDetails">
                        Hello, <strong>{userid || 'User'}</strong>
                        <span>({designation || 'Member'})</span>
                    </div>
                    <button
                        className="logout-btn"
                        onClick={async () => {
                            try {
                                const response = await fetch(`${API_URL}/auth/logout`, {
                                    method: 'POST',
                                    credentials: 'include'
                                });
                                if (response.ok) {
                                    setOptionsOpened(false);
                                    navigate('/Login');
                                }
                            } catch (err) {
                                console.error('Error logging out:', err.message);
                            }
                        }}
                    >
                        <span className="material-symbols-outlined">logout</span>
                        Logout
                    </button>
                </GlassSurface>
            )}
        </div>
    )
};

export default NavTab;