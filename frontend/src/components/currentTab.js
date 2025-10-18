import { useState, useContext, useRef } from "react";
import { FunctionsContext } from "../context/functionsContext";

const CurrentTab = ({ API_URL }) => {
    const { tab, dispatch } = useContext(FunctionsContext);

    const TeacherList = () => {
        const [name, setName] = useState('');
        const [roll, setRoll] = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [cabin, setCabin] = useState('');
        const [error, setError] = useState(null);
        const [file, setFile] = useState(null);
        const [emptyFields, setEmptyFields] = useState([]);
        const fileInputRef = useRef(null);

        const handleFileChange = (e) => {
            const selectedFile = e.target.files[0];
            if(!selectedFile) return;
            const allowedTypes = [
                'text/csv',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            if(!allowedTypes.includes(selectedFile.type) || !allowedTypes.includes(selectedFile.mimetype)) {
                setError('Only Excel(.xls, .xlsx) or CSV(.csv) files are allowed');
                setFile(null);
            } else {
                setError(null);
                setFile(selectedFile);
            }
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            if(file) {
                const formData = new FormData();
                formData.append("file", file);
                try {
                    const response = await fetch(`${API_URL}/File/TeacherList`, {
                        method: 'POST',
                        body: formData
                    });
                    const json = await response.json();
                    if(!response.ok) setError(json.error);
                    else {
                        setError(null);
                        setFile(null);
                        if(fileInputRef.current) fileInputRef.current.value = null;
                        if(json.result) dispatch({ type: 'SET_TEACHER_LIST', payload: json.result });
                    }
                } catch (error) {
                    setError({ error: error.message });
                }
            }
            else {
                const teacherDetails = { name, roll, email, phone, cabin };
                const response = await fetch(`${API_URL}/api/TeacherList`, {
                    method: 'POST',
                    body: JSON.stringify(teacherDetails),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                if(!response.ok) {
                    setError(json.error);
                    setEmptyFields(json.emptyFields);
                }
                else {
                    setError(null);
                    setEmptyFields([]);
                    setName('');
                    setRoll('');
                    setEmail('');
                    setPhone('');
                    setCabin('');
                    dispatch({ type: 'ADD_TEACHER_DETAILS', payload: json});
                }
            }
        }

        return (
            <div className="teacherList">
                <h1>Teacher List</h1>
                <form className="teacherListForm" onSubmit={handleSubmit}>
                    <div className="InitialzeTeacherList">
                        <h3>Initialize Teacher Details List:</h3>
                        <label>
                            Upload teacher details sheet:
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange = {handleFileChange}
                            />
                        </label>
                    </div>
                    <div className="AddTeacherDetails">
                        <h3>Enter Teacher Details:</h3>
                        <label>
                            Name: 
                            <input 
                                type="text"
                                onChange={((e) => setName(e.target.value))}
                                value={name}
                                className={emptyFields.includes('name') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Roll No: 
                            <input 
                                type="number"
                                onChange={((e) => setRoll(e.target.value))}
                                value={roll}
                                className={emptyFields.includes('roll') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Email: 
                            <input 
                                type="text"
                                onChange={((e) => setEmail(e.target.value))}
                                value={email}
                                className={emptyFields.includes('email') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Phone no: 
                            <input 
                                type="number"
                                onChange={((e) => setPhone(e.target.value))}
                                value={phone}
                                className={emptyFields.includes('phone') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Cabin: 
                            <input 
                                type="text"
                                onChange={((e) => setCabin(e.target.value))}
                                value={cabin}
                                className={emptyFields.includes('cabin') ? 'error' : ''}
                            />
                        </label>
                    </div>
                    <button>Add Teacher Details</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        )
    };

    const StudentList = () => {
        const [name, setName] = useState('');
        const [roll, setRoll] = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [section, setSection] = useState('');
        const [error, setError] = useState(null);
        const [file, setFile] = useState(null);
        const [emptyFields, setEmptyFields] = useState([]);
        const fileInputRef = useRef(null);

        const handleFileChange = (e) => {
            const selectedFile = e.target.files[0];
            if(!selectedFile) return;
            const allowedTypes = [
                'text/csv',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            if(!allowedTypes.includes(selectedFile.type)) {
                setError('Only Excel(.xls, .xlsx) or CSV(.csv) files are allowed');
                setFile(null);
            } else {
                setError(null);
                setFile(selectedFile);
            }
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            if(file) {
                const formData = new FormData();
                formData.append("file", file);
                try {
                    const response = await fetch(`${API_URL}/File/StudentList`, {
                        method: 'POST',
                        body: formData
                    });
                    const json = await response.json();
                    if(!response.ok) setError(json.error);
                    else {
                        setError(null);
                        setFile(null);
                        if(fileInputRef.current) fileInputRef.current.value = null;
                        if(json.result) dispatch({ type: 'SET_STUDENT_LIST', payload: json.result });
                    }
                } catch (error) {
                    setError({ error: error.message });
                }
            }
            else {
                const studentDetails = { name, roll, email, phone, section };
                const response = await fetch(`${API_URL}/api/StudentList`, {
                    method: 'POST',
                    body: JSON.stringify(studentDetails),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                if(!response.ok) {
                    setError(json.error);
                    setEmptyFields(json.emptyFields);
                }
                else {
                    setError(null);
                    setEmptyFields([]);
                    setName('');
                    setRoll('');
                    setEmail('');
                    setPhone('');
                    setSection('');
                    dispatch({ type: 'ADD_STUDENT_DETAILS', payload: json});
                }
            }
        }

        return (
            <div className="studentList">
                <h1>Student List</h1>
                <form className="studentListForm" onSubmit={handleSubmit}>
                    <div className="InitialzeStudentList">
                        <h3>Initialize Student Details List:</h3>
                        <label>
                            Upload student details sheet:
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange = {handleFileChange}
                            />
                        </label>
                    </div>
                    <div className="AddStudentDetails">
                        <h3>Enter Student Details:</h3>
                        <label>
                            Name: 
                            <input 
                                type="text"
                                onChange={((e) => setName(e.target.value))}
                                value={name}
                                className={emptyFields.includes('name') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Roll No: 
                            <input 
                                type="number"
                                onChange={((e) => setRoll(e.target.value))}
                                value={roll}
                                className={emptyFields.includes('roll') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Email: 
                            <input 
                                type="text"
                                onChange={((e) => setEmail(e.target.value))}
                                value={email}
                                className={emptyFields.includes('email') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Phone no: 
                            <input 
                                type="number"
                                onChange={((e) => setPhone(e.target.value))}
                                value={phone}
                                className={emptyFields.includes('phone') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Section: 
                            <input 
                                type="text"
                                onChange={((e) => setSection(e.target.value))}
                                value={section}
                                className={emptyFields.includes('section') ? 'error' : ''}
                            />
                        </label>
                    </div>
                    <button>Add Student Details</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        )
    };

    const TeacherRoutine = () => {
        const [roll, setRoll] = useState('');
        const [day, setDay] = useState('');
        const [time, setTime] = useState('');
        const [section, setSection] = useState('');
        const [batch, setBatch] = useState('');
        const [classroom, setClassroom] = useState('');
        const [error, setError] = useState(null);
        const [file, setFile] = useState(null);
        const [emptyFields, setEmptyFields] = useState([]);
        const fileInputRef = useRef(null);

        const handleFileChange = (e) => {
            const selectedFile = e.target.files[0];
            if(!selectedFile) return;
            const allowedTypes = [
                'text/csv',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            if(!allowedTypes.includes(selectedFile.type)) {
                setError('Only Excel(.xls, .xlsx) or CSV(.csv) files are allowed');
                setFile(null);
            } else {
                setError(null);
                setFile(selectedFile);
            }
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            if(file) {
                const formData = new FormData();
                formData.append("file", file);
                try {
                    const response = await fetch(`${API_URL}/File/TeacherRoutine`, {
                        method: 'POST',
                        body: formData
                    });
                    const json = await response.json();
                    if(!response.ok) setError(json.error);
                    else {
                        setError(null);
                        setFile(null);
                        if(fileInputRef.current) fileInputRef.current.value = null;
                        if(json.result) dispatch({ type: 'SET_TEACHER_ROUTINE', payload: json.result });
                    }
                } catch (error) {
                    setError({ error: error.message });
                }
            }
            else {
                const TeacherRoutine = { roll, day, time, section, batch, classroom };
                const response = await fetch(`${API_URL}/api/TeacherRoutine`, {
                    method: 'POST',
                    body: JSON.stringify(TeacherRoutine),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                if(!response.ok) {
                    setError(json.error);
                    setEmptyFields(json.emptyFields);
                }
                else {
                    setError(null);
                    setEmptyFields([]);
                    setRoll('');
                    setDay('');
                    setTime('');
                    setSection('');
                    setBatch('');
                    setClassroom('');
                    dispatch({ type: 'ADD_TEACHER_ROUTINE', payload: json});
                }
            }
        }

        return (
            <div className="teacherRoutine">
                <h1>Teacher Routine</h1>
                <form className="teacherRoutineForm" onSubmit={handleSubmit}>
                    <div className="InitialzeTeacherRoutine">
                        <h3>Initialize Teacher Routine List:</h3>
                        <label>
                            Upload Teacher Routine sheet:
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange = {handleFileChange}
                            />
                        </label>
                    </div>
                    <div className="AddTeacherRoutine">
                        <h3>Enter Teacher Routine:</h3>
                        <label>
                            Roll No: 
                            <input 
                                type="number"
                                onChange={((e) => setRoll(e.target.value))}
                                value={roll}
                                className={emptyFields.includes('roll') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Day: 
                            <input 
                                type="text"
                                onChange={((e) => setDay(e.target.value))}
                                value={day}
                                className={emptyFields.includes('day') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Time: 
                            <input 
                                type="text"
                                onChange={((e) => setTime(e.target.value))}
                                value={time}
                                className={emptyFields.includes('time') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Section: 
                            <input 
                                type="text"
                                onChange={((e) => setSection(e.target.value))}
                                value={section}
                                className={emptyFields.includes('section') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Batch: 
                            <input 
                                type="number"
                                onChange={((e) => setBatch(e.target.value))}
                                value={batch}
                                className={emptyFields.includes('batch') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Classroom: 
                            <input 
                                type="text"
                                onChange={((e) => setClassroom(e.target.value))}
                                value={classroom}
                                className={emptyFields.includes('classroom') ? 'error' : ''}
                            />
                        </label>
                    </div>
                    <button>Add Teacher Routine</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        )
    };

    const StudentRoutine = () => {
        const [roll, setRoll] = useState('');
        const [subject, setSubject] = useState('');
        const [day, setDay] = useState('');
        const [time, setTime] = useState('');
        const [classroom, setClassroom] = useState('');
        const [teacher, setTeacher] = useState('');
        const [error, setError] = useState(null);
        const [file, setFile] = useState(null);
        const [emptyFields, setEmptyFields] = useState([]);
        const fileInputRef = useRef(null);

        const handleFileChange = (e) => {
            const selectedFile = e.target.files[0];
            if(!selectedFile) return;
            const allowedTypes = [
                'text/csv',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            if(!allowedTypes.includes(selectedFile.type)) {
                setError('Only Excel(.xls, .xlsx) or CSV(.csv) files are allowed');
                setFile(null);
                e.target.value = null;
            } else {
                setError(null);
                setFile(selectedFile);
            }
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            if(file) {
                const formData = new FormData();
                formData.append("file", file);
                try {
                    const response = await fetch(`${API_URL}/File/StudentRoutine`, {
                        method: 'POST',
                        body: formData
                    });
                    const json = await response.json();
                    if(!response.ok) setError(json.error);
                    else {
                        setError(null);
                        setFile(null);
                        if(fileInputRef.current) fileInputRef.current.value = null;
                        if(json.result) dispatch({ type: 'SET_STUDENT_ROUTINE', payload: json.result });
                    }
                } catch (error) {
                    setError({ error: error.message });
                }
            }
            else {
                const StudentRoutine = { roll, subject, day, time, classroom, teacher };
                const response = await fetch(`${API_URL}/api/StudentRoutine`, {
                    method: 'POST',
                    body: JSON.stringify(StudentRoutine),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                if(!response.ok) {
                    setError(json.error);
                    setEmptyFields(json.emptyFields);
                }
                else {
                    setError(null);
                    setEmptyFields([]);
                    setRoll('');
                    setSubject('');
                    setDay('');
                    setTime('');
                    setClassroom('');
                    setTeacher('');
                    dispatch({ type: 'ADD_STUDENT_ROUTINE', payload: json});
                }
            }
        }

        return (
            <div className="studentRoutine">
                <h1>Student Routine</h1>
                <form className="studentRoutineForm" onSubmit={handleSubmit}>
                    <div className="InitialzeStudentRoutine">
                        <h3>Initialize Student Routine List:</h3>
                        <label>
                            Upload Student Routine sheet:
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange = {handleFileChange}
                            />
                        </label>
                    </div>
                    <div className="AddStudentRoutine">
                        <h3>Enter Student Routine:</h3>
                        <label>
                            Roll No: 
                            <input 
                                type="number"
                                onChange={((e) => setRoll(e.target.value))}
                                value={roll}
                                className={emptyFields.includes('roll') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Subject: 
                            <input 
                                type="text"
                                onChange={((e) => setSubject(e.target.value))}
                                value={subject}
                                className={emptyFields.includes('subject') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Day: 
                            <input 
                                type="text"
                                onChange={((e) => setDay(e.target.value))}
                                value={day}
                                className={emptyFields.includes('day') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Time: 
                            <input 
                                type="text"
                                onChange={((e) => setTime(e.target.value))}
                                value={time}
                                className={emptyFields.includes('time') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Classroom: 
                            <input 
                                type="text"
                                onChange={((e) => setClassroom(e.target.value))}
                                value={classroom}
                                className={emptyFields.includes('classroom') ? 'error' : ''}
                            />
                        </label>
                        <label>
                            Teacher: 
                            <input 
                                type="text"
                                onChange={((e) => setTeacher(e.target.value))}
                                value={teacher}
                                className={emptyFields.includes('teacher') ? 'error' : ''}
                            />
                        </label>
                    </div>
                    <button>Add Student Routine</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        )
    };

    const tabSelector = () => {
        switch(tab) {
            case 'teacherList':
                return <TeacherList />;
            case 'studentList':
                return <StudentList />;
            case 'teacherRoutine':
                return <TeacherRoutine />;
            case 'studentRoutine':
                return <StudentRoutine />;
            default:
                return (
                    <div className="InvalidTab">
                        <h1>Invalid Tab Selection</h1>
                        <p>Please Refresh the page or select another tab</p>
                    </div>
                )
        }
    };

    return (
        <div className='CurrentTab'>
            {tabSelector()}
        </div>
    )
};

export default CurrentTab;