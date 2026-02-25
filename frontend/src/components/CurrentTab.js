import { useState, useContext,  } from 'react';
import { FunctionsContext } from '../context/functionsContext';


const CurrentTab = ({ API_URL }) => {
    const { tab, dispatch } = useContext(FunctionsContext);
    const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        const apiMap = {
            teacherList: `${API_URL}/api/TeacherList`,
            studentList: `${API_URL}/api/StudentList`,
            routine: `${API_URL}/api/Routine`,
            administration: `${API_URL}/api/Administration` 
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
                administration: 'ADD_ADMINISTRATION_DETAILS'
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

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
             alert('Please select a file to upload');
             return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(`${API_URL}/api/upload/teachers`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                alert('File uploaded successfully!');
                setSelectedFile(null);
            } else {
                alert('Upload failed. Please check file format.');
            }

        } catch (err) {
            console.error('Upload error:', err.message);
            alert('Upload error. Please try again.');
        }
    };

    const renderForm = () => {
        switch (tab) {
            case 'teacherList':
                return (
                    <div className='TeacherListPage'>
                        <div className='header'>
                            <h1>Faculty List</h1>
                            <div className='upload-section'>
                                <h3>Initialize Teacher Details List:</h3>
                                <form className='upload-section' onSubmit={handleFileUpload}>
                                    <label htmlFor="file-upload" className="upload-label">
                                        <span className="material-symbols-outlined">upload</span>
                                        <p>Upload teacher details sheet:</p>
                                        <p className='file-hint'>Supported: .csv, .xlsx, .xls</p>
                                    </label>
                                    <input 
                                        id="file-upload"
                                        type="file" 
                                        accept=".csv,.xlsx,.xls"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                    {selectedFile && (
                                        <button type="submit" className="upload-button">
                                            Upload File
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className='add-section'>
                            <h3>ADD TEACHER DETAILS</h3>
                            <form onSubmit={handleSubmit} className="teacher-form">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input name="name" placeholder="name" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input name="email" placeholder="email" type="email" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Phone No:</label>
                                    <input name="phone" placeholder="phone" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Cabin:</label>
                                    <input name="cabin" placeholder="cabin" onChange={handleChange} required />
                                </div>
                                <button type="submit" className="add-teacher-button">ADD TEACHER DETAILS</button>
                            </form>
                        </div>
                    </div>
                );
            case 'studentList':
                return (
                    <div className='StudentListPage'>
                        <div className='header'>
                            <h1>Student List</h1>
                            <div className='upload-section'>
                                <h3>Initialize Student Details List:</h3>
                                <form className='upload-box' onSubmit={handleFileUpload}>
                                    <label htmlFor="file-upload" className="upload-label">
                                        <span className="material-symbols-outlined">upload</span>
                                        <p>{selectedFile ? selectedFile.name : 'Upload student details sheet:'}</p>
                                        <p className='file-hint'>Supported: .csv, .xlsx, .xls</p>
                                    </label>
                                    <input 
                                        id="file-upload"
                                        type="file" 
                                        accept=".csv,.xlsx,.xls"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                    {selectedFile && (
                                        <button type="submit" className="upload-button">Upload File</button>
                                    )}
                                </form>
                            </div>
                        </div>
                        
                        <div className="divider"></div>
                        
                        <div className='add-section'>
                            <h3>Enter Student Details:</h3>
                            <form onSubmit={handleSubmit} className="student-form">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input name="name" placeholder="name" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Roll No:</label>
                                    <input name="roll" placeholder="roll number" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input name="email" placeholder="email" type="email" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Phone No:</label>
                                    <input name="phone" placeholder="phone number" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Section:</label>
                                    <input name="section" placeholder="section" onChange={handleChange} required />
                                </div>
                                <button type="submit" className="add-student-button">ADD STUDENT DETAILS</button>
                            </form>
                        </div>
                    </div>
                );
            case 'routine':
                return (
                    <div className='RoutinePage'>
                        <div className='header'>
                            <h1>Routine List</h1>
                            <div className='upload-section'>
                                <h3>Initialize Routine Details List:</h3>
                                <form className='upload-box' onSubmit={handleFileUpload}>
                                    <label htmlFor="file-upload" className="upload-label">
                                        <span className="material-symbols-outlined">upload</span>
                                        <p>{selectedFile ? selectedFile.name : 'Upload routine details sheet:'}</p>
                                        <p className='file-hint'>Supported: .csv, .xlsx, .xls</p>
                                    </label>
                                    <input 
                                        id="file-upload"
                                        type="file" 
                                        accept=".csv,.xlsx,.xls"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                    {selectedFile && (
                                        <button type="submit" className="upload-button">Upload File</button>
                                    )}
                                </form>
                            </div>
                        </div>
                        
                        <div className="divider"></div>
                        
                        <div className='add-section'>
                            <h3>Enter Routine Details:</h3>
                            <form onSubmit={handleSubmit} className="routine-form">
                                <div className="form-group">
                                    <label>Subject:</label>
                                    <input name="section" placeholder="section" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Time:</label>
                                    <input name="subject" placeholder="subject" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Day:</label>
                                    <input name="day" placeholder="Enter day" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Classroom:</label>
                                    <input name="time" placeholder="HH:MM-HH:MM" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Section:</label>
                                    <input name="classroom" placeholder="classroom" onChange={handleChange} required />
                                </div>
                                <button type="submit" className="add-routine-button">ADD ROUTINE DETAILS</button>
                            </form>
                        </div>
                    </div>
                );
            case 'administration':
                return (
                    <div className='AdministrationPage'>
                        <div className='header'>
                            <h1>Administration List</h1>
                        </div>

                        <div className="divider"></div>

                        <div className='add-section'>
                            <h3>ADD ADMINISTRATION DETAILS</h3>
                            <form onSubmit={handleSubmit} className="admin-form">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input name="name" placeholder="name" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input name="email" type="email" placeholder="email" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Phone No:</label>
                                    <input name="phone" placeholder="phone" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Cabin:</label>
                                    <input name="cabin" placeholder="cabin" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Department:</label>
                                    <input name="department" placeholder="department" onChange={handleChange} required />
                                </div>
                                <button type="submit" className="add-admin-button">
                                    ADD ADMINISTRATION DETAILS
                                </button>
                            </form>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div className="CurrentTab">{renderForm()}</div>;
};

export default CurrentTab;