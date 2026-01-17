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
            default:
                console.log('currentDetails: jsonError: Invalid option');
        }
        
    }

    switch (tab) {
        case 'teacherList':
            return (
                <div className='TeacherDetails'>
                    
                    <div className='header'>
                        <h4>{details.name.replace(/ /g, '\n')}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>Roll:</strong> {details.roll}</p>
                    <p><strong>Email:</strong> {details.email}</p>
                    <p><strong>Phone:</strong> {details.phone}</p>
                    <p><strong>Cabin:</strong> {details.cabin}</p>
                </div>
            )
        case 'studentList':
            return (
                <div className='StudentDetails'>
                    <div className='header'>
                        <h4>{details.name.replace(/ /g, '\n')}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>Roll:</strong> {details.roll}</p>
                    <p><strong>Email:</strong> {details.email}</p>
                    <p><strong>Phone:</strong> {details.phone}</p>
                    <p><strong>Section:</strong> {details.section}</p>
                </div>
            )
        case 'routine':
            return (
                <div className='Routine'>
                    <div className='header'>
                        <h4>{details.section}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>Subject:</strong> {details.subject}</p>
                    <p><strong>Day & Time:</strong> {details.day} at {details.time}</p>
                    <p><strong>Classroom:</strong> {details.classroom}</p>
                    <p><strong>Teacher:</strong> {details.teacher}</p>
                </div>
            )
        default:
            console.log('currentDetails: cardDetails: Invalid option');
            return null;
    }
};

export default CurrentDetails;