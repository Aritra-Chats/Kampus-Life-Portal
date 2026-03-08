import { useState, useContext } from 'react';
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
            administrationList: `${API_URL}/api/AdministrationList`,
            mentorList: `${API_URL}/api/MentorList`,
            holidayList: `${API_URL}/api/Holiday`
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
                administrationList: 'ADD_ADMINISTRATION_DETAILS',
                mentorList: 'ADD_MENTOR_DETAILS',
                holidayList: 'ADD_HOLIDAY_DETAILS'
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

        // Determine the correct upload endpoint based on tab
        let uploadEndpoint = `${API_URL}/api/upload/`;
        switch (tab) {
            case 'teacherList':
                uploadEndpoint += 'teachers';
                break;
            case 'studentList':
                uploadEndpoint += 'students';
                break;
            case 'routine':
                uploadEndpoint += 'routines';
                break;
            case 'administrationList':
                uploadEndpoint += 'administration';
                break;
            case 'mentorList':
                uploadEndpoint += 'mentors';
                break;
            case 'holidayList':
                uploadEndpoint += 'holidays';
                break;
            default:
                uploadEndpoint += 'teachers';
        }

        try {
            const response = await fetch(uploadEndpoint, {
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
                        </div>
                        
                        <div className='upload-section'>
                            <h3>Initialize Teacher Details List:</h3>
                            <form className='upload-box' onSubmit={handleFileUpload}>
                                <label htmlFor="teacher-file-upload" className="upload-label">
                                    <span className="material-symbols-outlined">upload</span>
                                    <p>{selectedFile ? selectedFile.name : 'Upload teacher details sheet:'}</p>
                                    <p className='file-hint'>Supported: .csv, .xlsx, .xls</p>
                                </label>
                                <input 
                                    id="teacher-file-upload"
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

                        <div className="divider"></div>

                        <div className='add-section'>
                            <h3>ADD TEACHER DETAILS</h3>
                            <form onSubmit={handleSubmit} className="teacher-form">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input 
                                        name="name" 
                                        placeholder="Enter teacher name" 
                                        value={formData.name || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        name="email" 
                                        placeholder="Enter email address" 
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone No:</label>
                                    <input 
                                        name="phone" 
                                        placeholder="Enter phone number"
                                        value={formData.phone || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Cabin:</label>
                                    <input 
                                        name="cabin" 
                                        placeholder="Enter cabin number"
                                        value={formData.cabin || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Sections:</label>
                                    <input 
                                        name="sections" 
                                        placeholder="Enter sections"
                                        value={formData.sections || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
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
                        </div>
                        
                        <div className='upload-section'>
                            <h3>Initialize Student Details List:</h3>
                            <form className='upload-box' onSubmit={handleFileUpload}>
                                <label htmlFor="student-file-upload" className="upload-label">
                                    <span className="material-symbols-outlined">upload</span>
                                    <p>{selectedFile ? selectedFile.name : 'Upload student details sheet:'}</p>
                                    <p className='file-hint'>Supported: .csv, .xlsx, .xls</p>
                                </label>
                                <input 
                                    id="student-file-upload"
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
                        
                        <div className="divider"></div>
                        
                        <div className='add-section'>
                            <h3>ADD STUDENT DETAILS</h3>
                            <form onSubmit={handleSubmit} className="student-form">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input 
                                        name="name" 
                                        placeholder="Enter student name"
                                        value={formData.name || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Roll No:</label>
                                    <input 
                                        name="roll" 
                                        placeholder="Enter roll number"
                                        value={formData.roll || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        name="email" 
                                        placeholder="Enter email address" 
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone No:</label>
                                    <input 
                                        name="phone" 
                                        placeholder="Enter phone number"
                                        value={formData.phone || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Section:</label>
                                    <input 
                                        name="section" 
                                        placeholder="Enter section"
                                        value={formData.section || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
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
                        </div>
                        
                        <div className='upload-section'>
                            <h3>Initialize Routine Details List:</h3>
                            <form className='upload-box' onSubmit={handleFileUpload}>
                                <label htmlFor="routine-file-upload" className="upload-label">
                                    <span className="material-symbols-outlined">upload</span>
                                    <p>{selectedFile ? selectedFile.name : 'Upload routine details sheet:'}</p>
                                    <p className='file-hint'>Supported: .csv, .xlsx, .xls</p>
                                </label>
                                <input 
                                    id="routine-file-upload"
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
                        
                        <div className="divider"></div>
                        
                        <div className='add-section'>
                            <h3>ADD ROUTINE DETAILS</h3>
                            <form onSubmit={handleSubmit} className="routine-form">
                                <div className="form-group">
                                    <label>Subject:</label>
                                    <input 
                                        name="subject" 
                                        placeholder="Enter subject name"
                                        value={formData.subject || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Teacher:</label>
                                    <input 
                                        name="teacher" 
                                        placeholder="Enter teacher name"
                                        value={formData.teacher || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Day:</label>
                                    <input 
                                        name="day" 
                                        placeholder="Enter day (e.g., Monday)"
                                        value={formData.day || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Time:</label>
                                    <input 
                                        name="time" 
                                        placeholder="HH:MM-HH:MM"
                                        value={formData.time || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Classroom:</label>
                                    <input 
                                        name="classroom" 
                                        placeholder="Enter room number"
                                        value={formData.classroom || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Section:</label>
                                    <input 
                                        name="section" 
                                        placeholder="Enter section"
                                        value={formData.section || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="add-routine-button">ADD ROUTINE DETAILS</button>
                            </form>
                        </div>
                    </div>
                );
                
            case 'administrationList':
                return (
                    <div className='AdministrationPage'>
                        <div className='header'>
                            <h1>Administration List</h1>
                        </div>

                        <div className='upload-section'>
                            <h3>Initialize Administration Details List:</h3>
                            <form className='upload-box' onSubmit={handleFileUpload}>
                                <label htmlFor="admin-file-upload" className="upload-label">
                                    <span className="material-symbols-outlined">upload</span>
                                    <p>{selectedFile ? selectedFile.name : 'Upload administration details sheet:'}</p>
                                    <p className='file-hint'>Supported: .csv, .xlsx, .xls</p>
                                </label>
                                <input 
                                    id="admin-file-upload"
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

                        <div className="divider"></div>

                        <div className='add-section'>
                            <h3>ADD ADMINISTRATION DETAILS</h3>
                            <form onSubmit={handleSubmit} className="administration-form">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input 
                                        name="name" 
                                        placeholder="Enter administrator name"
                                        value={formData.name || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Designation:</label>
                                    <input 
                                        name="designation" 
                                        placeholder="Enter designation"
                                        value={formData.designation || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        name="email" 
                                        type="email" 
                                        placeholder="Enter email address"
                                        value={formData.email || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone No:</label>
                                    <input 
                                        name="phone" 
                                        placeholder="Enter phone number"
                                        value={formData.phone || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Department:</label>
                                    <input 
                                        name="department" 
                                        placeholder="Enter department"
                                        value={formData.department || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Office:</label>
                                    <input 
                                        name="office" 
                                        placeholder="Enter office location"
                                        value={formData.office || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="add-administration-button">
                                    ADD ADMINISTRATION DETAILS
                                </button>
                            </form>
                        </div>
                    </div>
                );

            case 'mentorList':
                return (
                    <div className='MentorsPage'>
                        <div className='header'>
                            <h1>Mentor List</h1>
                        </div>

                        <div className='upload-section'>
                            <h3>Initialize Mentors Details List:</h3>
                            <form className='upload-box' onSubmit={handleFileUpload}>
                                <label htmlFor="mentors-file-upload" className="upload-label">
                                    <span className="material-symbols-outlined">upload</span>
                                    <p>{selectedFile ? selectedFile.name : 'Upload mentors details sheet:'}</p>
                                    <p className='file-hint'>Supported: .csv, .xlsx, .xls</p>
                                </label>
                                <input 
                                    id="mentors-file-upload"
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

                        <div className="divider"></div>

                        <div className='add-section'>
                            <h3>ADD MENTOR DETAILS</h3>
                            <form onSubmit={handleSubmit} className="mentors-form">
                                <div className="form-group">
                                    <label>MENTOR ID:</label>
                                    <input 
                                        name="mentorid" 
                                        placeholder="Enter mentor id"
                                        value={formData.mentorid || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>MENTEE ID:</label>
                                    <input 
                                        name="menteeid" 
                                        placeholder="Enter mentee id"
                                        value={formData.menteeid || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="add-mentor-button">
                                    ADD MENTOR DETAILS
                                </button>
                            </form>
                        </div>
                    </div>
                );

            case 'holidayList':
                return (
                    <div className='HolidaysPage'>
                        <div className='header'>
                            <h1>Holiday List</h1>
                        </div>

                        <div className='upload-section'>
                            <h3>Initialize Holidays List:</h3>
                            <form className='upload-box' onSubmit={handleFileUpload}>
                                <label htmlFor="holidays-file-upload" className="upload-label">
                                    <span className="material-symbols-outlined">upload</span>
                                    <p>{selectedFile ? selectedFile.name : 'Upload holidays sheet:'}</p>
                                    <p className='file-hint'>Supported: .csv, .xlsx, .xls</p>
                                </label>
                                <input 
                                    id="holidays-file-upload"
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

                        <div className="divider"></div>

                        <div className='add-section'>
                            <h3>ADD HOLIDAY DETAILS</h3>
                            <form onSubmit={handleSubmit} className="holidays-form">
                                <div className="form-group">
                                    <label>Date:</label>
                                    <input 
                                        name="date"
                                        type="text" 
                                        placeholder="Select date"
                                        value={formData.date || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Event:</label>
                                    <input 
                                        name="event" 
                                        placeholder="Enter event name"
                                        value={formData.event || ''}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="add-holiday-button">
                                    ADD HOLIDAY DETAILS
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