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
            routine: `${API_URL}/api/Routine`
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
                routine: 'ADD_ROUTINE'
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

                        <div className='add'>
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
                                    <input name="subject" placeholder="subject" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Time:</label>
                                    <input name="time" placeholder="HH:MM-HH:MM" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Day:</label>
                                    <input name="day" placeholder="day" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Classroom:</label>
                                    <input name="classroom" placeholder="classroom" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Section:</label>
                                    <input name="section" placeholder="section" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Batch:</label>
                                    <input name="batch" placeholder=" batch" onChange={handleChange} required />
                                </div>
                                <button type="submit" className="add-routine-button">ADD ROUTINE DETAILS</button>
                            </form>
                        </div>
                    </div>
                );
            case 'routine':
                return (
                    <form onSubmit={handleSubmit}>
                        <input name="roll" placeholder="Roll" onChange={handleChange} required />
                        <input name="subject" placeholder="Subject" onChange={handleChange} required />
                        <input name="time" placeholder="Time" onChange={handleChange} required />
                        <input name="day" placeholder="Day" onChange={handleChange} required />
                        <input name="classroom" placeholder="Classroom" onChange={handleChange} required />
                        <input name="section" placeholder="Section" onChange={handleChange} required />
                        <input name="batch" placeholder="Batch" onChange={handleChange} required />
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