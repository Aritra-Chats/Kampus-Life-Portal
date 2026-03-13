import { Link } from 'react-router-dom'
import { useContext, useState, useEffect, useRef } from 'react'
import { FunctionsContext } from '../context/functionsContext'
import GlassSurface from './GlassSurface';
import { useNavigate } from 'react-router-dom';

const NavTab = () => {
    const { tab, dispatch } = useContext(FunctionsContext);
    const [userid, setUserID] = useState('');
    const [designation, setDesignation] = useState('');
    const [optionsOpened, setOptionsOpened] = useState(false);

    // Add refs for click outside detection
    const userPanelRef = useRef(null);
    const userOptionsRef = useRef(null);

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

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsOpened) {
                // Check if click is on logout button or inside the popup
                const isClickOnLogout = event.target.closest('.logout-btn');
                const isClickOnUserPanel = userPanelRef.current && userPanelRef.current.contains(event.target);
                const isClickOnUserOptions = userOptionsRef.current && userOptionsRef.current.contains(event.target);
                
                // Only close if click is outside both components and not on logout button
                if (!isClickOnUserPanel && !isClickOnUserOptions && !isClickOnLogout) {
                    setOptionsOpened(false);
                }
            }
        };

        // Use mousedown for better responsiveness
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [optionsOpened]);

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
            case 'AdministrationList':
                dispatch({ type: 'SET_TAB', payload: 'administrationList' });
                break;
            case 'MentorList':
                dispatch({ type: 'SET_TAB', payload: 'mentorList' });
                break;
            case 'HolidayList':
                dispatch({ type: 'SET_TAB', payload: 'holidayList' });
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
                
                <h6>MISCELLANEOUS</h6>
                <div 
                    className={`option ${tab === 'administrationList' ? 'selected' : ''}`} 
                    onClick={() => switchTab('AdministrationList')}
                >
                    Administration List
                </div>
                <div 
                    className={`option ${tab === 'mentorList' ? 'selected' : ''}`} 
                    onClick={() => switchTab('MentorList')}
                >
                    Mentor List
                </div>
                <div 
                    className={`option ${tab === 'holidayList' ? 'selected' : ''}`} 
                    onClick={() => switchTab('HolidayList')}
                >
                    Holiday List
                </div>
            </div>
            
            {/* ===== ONLY ONE USER PANEL - WITH REF ADDED ===== */}
            <div className="user-glass" ref={userPanelRef}>
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

            {/* ===== ONLY ONE POPUP - WITH REF ADDED ===== */}
            {optionsOpened && (
                <GlassSurface
                    className="user-options-glass"
                    borderRadius={18}
                    opacity={0.15}
                    blur={16}
                    ref={userOptionsRef}
                >
                    <div className="UserDetails">
                        Hello, <strong>{userid || 'User'}</strong>
                        <span>({designation || 'Member'})</span>
                    </div>
                    <button
                        className="logout-btn"
                        onClick={async (e) => {
                            e.stopPropagation(); // Prevent event bubbling
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