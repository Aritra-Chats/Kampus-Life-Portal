const multer = require('multer');
const xlsx = require('xlsx');

const storage = multer.memoryStorage();

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            cb(null, true);
        else
            cb(new Error('Only CSV or Excel files are allowed'));
    }
});

const parseAndSend = async (req, res, apiType) => {
    try {
        if(!apiType) return res.status(400).json({ error: 'Missing apiType' });
        if(!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        if(!data || !data.length) return res.status(400).json({ error: 'No data found in sheet' });
        const fieldMap = {
            'Name': 'name',
            'Roll No.': 'roll',
            'Email id': 'email',
            'Phone No.': 'phone',
            'Section': 'section',
            'Cabin': 'cabin',
            'Day': 'day',
            'Time': 'time',
            'Classroom': 'classroom',
            'Teacher Name': 'teacher',
            'Batch': 'batch',
            'Subject': 'subject'
        };
        const allowedFieldsMap = {
            studentList: ['Name', 'Roll No.', 'Email id', 'Phone No.', 'Section'],
            teacherList: ['Name', 'Roll No.', 'Email id', 'Phone No.', 'Cabin'],
            studentRoutine: ['Roll No.', 'Subject', 'Day', 'Time', 'Classroom', 'Teacher Name'],
            teacherRoutine: ['Roll No.', 'Day', 'Time', 'Section', 'Batch', 'Classroom']
        };
        const allowedFields = allowedFieldsMap[apiType];
        if(!allowedFields) return res.status(400).json({ error: 'Invalid apiType' });
        const filteredData = data.map(row => {
            const filteredRow = {};
            allowedFields.forEach(field => {
                if(row.hasOwnProperty(field)) filteredRow[fieldMap[field]] = row[field];
            });
            return filteredRow;
        });
        const Models = {
            studentList: require('../models/studentListModel'),
            teacherList: require('../models/teacherListModel'),
            studentRoutine: require('../models/studentRoutineModel'),
            teacherRoutine: require('../models/teacherRoutineModel'),
        };
        const Model = Models[apiType];
        await Model.deleteMany({});
        const result = await Model.insertMany(filteredData, { ordered: false } );
        res.status(200).json({ message: `Inserted ${result.length} rows`, result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process file ' });
    }
};

module.exports = { upload, parseAndSend };