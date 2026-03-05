const multer = require('multer');
const xlsx = require('xlsx');

const StudentList = require('../models/studentListModel');
const TeacherList = require('../models/teacherListModel');
const Routine = require('../models/routineModel');
const AdministrationList = require('../models/administrationListModel');
const MentorList = require('../models/mentorListModel');
const Holiday = require('../models/holidayModel');

const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = new Set([
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]);

const formatDateParts = ({ day, month, year }) => {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  return `${dd}-${mm}-${year}`;
};

const formatDateObject = (dateObject) => {
  return formatDateParts({
    day: dateObject.getDate(),
    month: dateObject.getMonth() + 1,
    year: dateObject.getFullYear()
  });
};

const normalizeSingleHolidayDate = (value) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return formatDateObject(value);
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    const parsed = xlsx.SSF.parse_date_code(value);
    if (parsed) {
      return formatDateParts({ day: parsed.d, month: parsed.m, year: parsed.y });
    }
  }

  const text = String(value ?? '').trim();
  if (!text) return text;

  const ddmmyyyy = /^(\d{2})-(\d{2})-(\d{4})$/;
  if (ddmmyyyy.test(text)) return text;

  const ddmmyyyySlashes = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const slashMatch = text.match(ddmmyyyySlashes);
  if (slashMatch) {
    return `${slashMatch[1]}-${slashMatch[2]}-${slashMatch[3]}`;
  }

  const yyyymmdd = /^(\d{4})-(\d{2})-(\d{2})$/;
  const isoMatch = text.match(yyyymmdd);
  if (isoMatch) {
    return `${isoMatch[3]}-${isoMatch[2]}-${isoMatch[1]}`;
  }

  const parsedDate = new Date(text);
  if (!Number.isNaN(parsedDate.getTime())) {
    return formatDateObject(parsedDate);
  }

  return text;
};

const normalizeHolidayDate = (value) => {
  const text = String(value ?? '');
  if (!text.includes('--')) {
    return normalizeSingleHolidayDate(value);
  }

  return text.split('--').map((part) => normalizeSingleHolidayDate(part)).join('--');
};

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) return cb(null, true);
    cb(new Error('Only CSV or Excel files are allowed'));
  }
});

const IMPORT_CONFIG = {
  studentList: {
    model: StudentList,
    requiredHeaders: ['Name', 'Roll No.', 'Email id', 'Phone No.', 'Section'],
    mapRow: (row) => ({
      name: row['Name'],
      roll: row['Roll No.'],
      email: row['Email id'],
      phone: row['Phone No.'],
      section: row['Section']
    })
  },
  teacherList: {
    model: TeacherList,
    requiredHeaders: ['Name', 'Roll No.', 'Email id', 'Phone No.', 'Cabin', 'Sections'],
    mapRow: (row) => ({
      name: row['Name'],
      roll: row['Roll No.'],
      email: row['Email id'],
      phone: row['Phone No.'],
      cabin: row['Cabin'],
      sections: String(row['Sections'] ?? row['Section'] ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    })
  },
  routine: {
    model: Routine,
    requiredHeaders: ['Section', 'Subject', 'Day', 'Time', 'Teacher', 'Classroom'],
    mapRow: (row) => ({
      section: row['Section'],
      subject: row['Subject'],
      day: row['Day'],
      time: row['Time'],
      teacher: row['Teacher'],
      classroom: row['Classroom']
    })
  },
  administrationList: {
    model: AdministrationList,
    requiredHeaders: ['Name', 'Designation', 'Department', 'Email id', 'Phone No.', 'Cabin'],
    mapRow: (row) => ({
      name: row['Name'],
      designation: row['Designation'],
      department: row['Department'],
      email: row['Email id'],
      phone: row['Phone No.'],
      cabin: row['Cabin']
    })
  },
  mentorList: {
    model: MentorList,
    requiredHeaders: ['Mentor', 'Mentee'],
    mapRow: (row) => ({
      Mentor: row['Mentor'],
      Mentee: row['Mentee']
    })
  },
  holiday: {
    model: Holiday,
    requiredHeaders: ['Date', 'Event'],
    mapRow: (row) => ({
      Date: normalizeHolidayDate(row['Date']),
      Event: String(row['Event'] ?? '').trim()
    })
  },
};

const parseAndSend = async (req, res, apiType) => {
  try {
    const config = IMPORT_CONFIG[apiType];
    if (!config) return res.status(400).json({ error: 'Invalid apiType' });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) return res.status(400).json({ error: 'No worksheet found' });

    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
    if (!rows.length) return res.status(400).json({ error: 'No data found in sheet' });

    const headers = Object.keys(rows[0] || {});
    const missingHeaders = config.requiredHeaders.filter((h) => !headers.includes(h));
    if (missingHeaders.length) {
      return res.status(400).json({
        error: 'Missing required columns',
        missingHeaders
      });
    }

    const mappedRows = rows.map(config.mapRow);

    await config.model.deleteMany({});
    const inserted = await config.model.insertMany(mappedRows, { ordered: false });

    return res.status(200).json({
      message: `Inserted ${inserted.length} rows`,
      insertedCount: inserted.length
    });
  } catch (error) {
    if (error?.name === 'BulkWriteError') {
      return res.status(400).json({
        error: 'Some rows failed validation or uniqueness checks',
        details: error.writeErrors?.map((e) => e.errmsg || e.message) || []
      });
    }

    return res.status(500).json({
      error: 'Failed to process file',
      details: error.message
    });
  }
};

module.exports = { upload, parseAndSend };