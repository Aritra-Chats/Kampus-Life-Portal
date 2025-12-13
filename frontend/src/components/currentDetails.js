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
            case 'teacherRoutine':
                response = await fetch(`${API_URL}/api/TeacherRoutine/` + details._id, {
                    method: 'DELETE'
                });
                break;
            case 'studentRoutine':
                response = await fetch(`${API_URL}/api/StudentRoutine/` + details._id, {
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
            case 'teacherRoutine':
                dispatch({ type: 'DELETE_TEACHER_ROUTINE', payload: json});
                break;
            case 'studentRoutine':
                dispatch({ type: 'DELETE_STUDENT_ROUTINE', payload: json});
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
        case 'teacherRoutine':
            return (
                <div className='TeacherRoutine'>
                    <div className='header'>
                        <h4>{details.classroom}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>Roll:</strong> {details.roll}</p>
                    <p><strong>Time:</strong> {details.time} {details.day}</p>
                    <p><strong>Classroom:</strong> {details.classroom}</p>
                    <p><strong>Section:</strong> {details.section} {details.batch}</p>
                </div>
            )
        case 'studentRoutine':
            return (
                <div className ='StudentRoutine'>
                    <div className="header">
                        <h4>{details.classroom}</h4>
                        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    </div>
                    <p><strong>Roll:</strong> {details.roll}</p>
                    <p><strong>Subject:</strong> {details.subject}</p>
                    <p><strong>Time:</strong> {details.time} {details.day}</p>
                    <p><strong>Teacher:</strong> {details.teacher}</p>
                </div>
            )
        default:
            console.log('currentDetails: cardDetails: Invalid option');
    }
};

export default CurrentDetails;