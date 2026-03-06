import { useContext } from 'react';
import { FunctionsContext } from '../context/functionsContext';

const CurrentDetails = ({ details, API_URL }) => {

    const { tab, dispatch } = useContext(FunctionsContext);

    const handleClick = async () => {
        let response;
        switch (tab) {
            case 'teacherList':
                response = await fetch(`${API_URL}/api/TeacherList/` + details._id, {
                    method: 'DELETE'
                });
                break;
            case 'studentList':
                response = await fetch(`${API_URL}/api/StudentList/` + details._id, {
                    method: 'DELETE'
                });
                break;
            case 'routine':
                response = await fetch(`${API_URL}/api/Routine/` + details._id, {
                    method: 'DELETE'
                });
                break;
            case 'administration':
                response = await fetch(`${API_URL}/api/Administration/` + details._id, {
                    method: 'DELETE'
                });
                break;
            case 'mentors':
                response = await fetch(`${API_URL}/api/Mentors/` + details._id, {
                    method: 'DELETE'
                });
                break;
            case 'holidays':
                response = await fetch(`${API_URL}/api/Holidays/` + details._id, {
                    method: 'DELETE'
                });
                break;
            default:
                console.log('currentDetails: responseError: Invalid option');
        }
        
        if(!response.ok) {
            console.log("Delete Failed");
            try {
                const errorJson = await response.json();
                console.log("Error response:", errorJson);
            } catch (e) {
                console.log("Could not parse error response");
            }
            return;
        }
        
        const json = await response.json();
        switch (tab) {
            case 'teacherList':
                dispatch({ type: 'DELETE_TEACHER_DETAILS', payload: json});
                break;
            case 'studentList':
                dispatch({ type: 'DELETE_STUDENT_DETAILS', payload: json});
                break;
            case 'routine':
                dispatch({ type: 'DELETE_ROUTINE', payload: json});
                break;
            case 'administration':
                dispatch({ type: 'DELETE_ADMINISTRATION_DETAILS', payload: json });
                break;
            case 'mentors':
                dispatch({ type: 'DELETE_MENTOR_DETAILS', payload: json });
                break;
            case 'holidays':
                dispatch({ type: 'DELETE_HOLIDAY_DETAILS', payload: json });
                break;
            default:
                console.log('currentDetails: jsonError: Invalid option');
        }
    }

    switch (tab) {
        case 'teacherList':
            return (
                <div className='TeacherDetails'>
                    <div className='header'>
                        <h4>{details.name ? details.name.replace(/ /g, '\n') : 'No Name'}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>Roll:</strong> <span>{details.roll || 'N/A'}</span></p>
                    <p><strong>Email:</strong> <span>{details.email || 'N/A'}</span></p>
                    <p><strong>Phone:</strong> <span>{details.phone || 'N/A'}</span></p>
                    <p><strong>Cabin:</strong> <span>{details.cabin || 'N/A'}</span></p>
                </div>
            );
            
        case 'studentList':
            return (
                <div className='StudentDetails'>
                    <div className='header'>
                        <h4>{details.name ? details.name.replace(/ /g, '\n') : 'No Name'}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>Roll:</strong> <span>{details.roll || 'N/A'}</span></p>
                    <p><strong>Email:</strong> <span>{details.email || 'N/A'}</span></p>
                    <p><strong>Phone:</strong> <span>{details.phone || 'N/A'}</span></p>
                    <p><strong>Section:</strong> <span>{details.section || 'N/A'}</span></p>
                </div>
            );
            
        case 'routine':
            return (
                <div className='TeacherRoutine'>
                    <div className='header'>
                        <h4>{details.section || 'No Section'}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>Subject:</strong> <span>{details.subject || 'N/A'}</span></p>
                    <p><strong>Day & Time:</strong> <span>{details.day || 'N/A'} at {details.time || 'N/A'}</span></p>
                    <p><strong>Classroom:</strong> <span>{details.classroom || 'N/A'}</span></p>
                    <p><strong>Teacher:</strong> <span>{details.teacher || 'N/A'}</span></p>
                </div>
            );
            
        case 'administration':
            return (
                <div className='AdministrationDetails'>
                    <div className='header'>
                        <h4>{details.name ? details.name.replace(/ /g, '\n') : 'No Name'}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>Email:</strong> <span>{details.email || 'N/A'}</span></p>
                    <p><strong>Phone:</strong> <span>{details.phone || 'N/A'}</span></p>
                    <p><strong>Cabin:</strong> <span>{details.cabin || 'N/A'}</span></p>
                    <p><strong>Department:</strong> <span>{details.department || 'N/A'}</span></p>
                    <p><strong>Office:</strong> <span>{details.office || 'N/A'}</span></p>
                </div>
            );
            
        case 'mentors':
            return (
                <div className='MentorDetails'>
                    <div className='header'>
                        <h4>{details.name ? details.name.replace(/ /g, '\n') : 'No Name'}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>ID:</strong> <span>{details.id || details.mentorId || 'N/A'}</span></p>
                    <p><strong>Email:</strong> <span>{details.email || 'N/A'}</span></p>
                    <p><strong>Cabin:</strong> <span>{details.cabin || 'N/A'}</span></p>
                    <p><strong>Campus:</strong> <span>{details.campus || 'N/A'}</span></p>
                </div>
            );
            
        case 'holidays':
            return (
                <div className='HolidayDetails'>
                    <div className='header'>
                        <h4>{details.event || 'No Event'}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>Date:</strong> <span>{details.date ? new Date(details.date).toLocaleDateString() : 'N/A'}</span></p>
                    <p><strong>Event:</strong> <span>{details.event || 'N/A'}</span></p>
                </div>
            );
            
        default:
            console.log('currentDetails: cardDetails: Invalid option');
            return null;
    }
};

export default CurrentDetails;