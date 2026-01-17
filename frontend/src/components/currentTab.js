import { useState, useContext } from 'react';
import { FunctionsContext } from '../context/functionsContext';

const CurrentTab = ({ API_URL }) => {
    const { tab, dispatch } = useContext(FunctionsContext);
    const [formData, setFormData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        const apiMap = {
            teacherList: `${API_URL}/api/TeacherList`,
            studentList: `${API_URL}/api/StudentList`,
            routine: `${API_URL}/api/Routine`, 
        };

        try {
            response = await fetch(apiMap[tab], {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                console.log('Submit failed');
                return;
            }

            const json = await response.json();
            const actionMap = {
                teacherList: 'ADD_TEACHER_DETAILS',
                studentList: 'ADD_STUDENT_DETAILS',
                routine: 'ADD_ROUTINE',
            };

            dispatch({ type: actionMap[tab], payload: json });
            setFormData({});
        } catch (err) {
            console.error('Error submitting form:', err.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const renderForm = () => {
        switch (tab) {
            case 'teacherList':
                return (
                    <form onSubmit={handleSubmit}>
                        <input name="name" placeholder="Name" onChange={handleChange} required />
                        <input name="roll" placeholder="Roll" onChange={handleChange} required />
                        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
                        <input name="phone" placeholder="Phone" onChange={handleChange} required />
                        <input name="cabin" placeholder="Cabin" onChange={handleChange} required />
                        <button type="submit">Add Teacher</button>
                    </form>
                );
            case 'studentList':
                return (
                    <form onSubmit={handleSubmit}>
                        <input name="name" placeholder="Name" onChange={handleChange} required />
                        <input name="roll" placeholder="Roll" onChange={handleChange} required />
                        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
                        <input name="phone" placeholder="Phone" onChange={handleChange} required />
                        <input name="section" placeholder="Section" onChange={handleChange} required />
                        <button type="submit">Add Student</button>
                    </form>
                );
            case 'routine':
                return (
                    <form onSubmit={handleSubmit}>
                        <input name="subject" placeholder="Subject" onChange={handleChange} required />
                        <input name="time" placeholder="Time" onChange={handleChange} required />
                        <input name="day" placeholder="Day" onChange={handleChange} required />
                        <input name="classroom" placeholder="Classroom" onChange={handleChange} required />
                        <input name="section" placeholder="Section" onChange={handleChange} required />
                        <input name="batch" placeholder="Batch" onChange={handleChange} required />
                        <input name="teacher" placeholder="Teacher" onChange={handleChange} required />
                        <button type="submit">Add Routine</button>
                    </form>
                );
            default:
                return null;
        }
    };

    return <div className="CurrentTab">{renderForm()}</div>;
};

export default CurrentTab;