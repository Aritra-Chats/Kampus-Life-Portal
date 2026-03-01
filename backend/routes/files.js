const router = require('express').Router();
const { upload, parseAndSend } = require('../lib/multerConfig.js');

const uploadAndParse = (apiType) => async (req, res) => {
  try {
    await parseAndSend(req, res, apiType);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process upload' });
  }
};

// Canonical routes
router.post('/TeacherList', upload.single('file'), uploadAndParse('teacherList'));
router.post('/StudentList', upload.single('file'), uploadAndParse('studentList'));
router.post('/Routine', upload.single('file'), uploadAndParse('routine'));
router.post('/AdministrationList', upload.single('file'), uploadAndParse('administrationList'));
router.post('/MentorList', upload.single('file'), uploadAndParse('mentorList'));
router.post('/Holiday', upload.single('file'), uploadAndParse('holiday'));

// Backward-compatible aliases
router.post('/upload/teachers', upload.single('file'), uploadAndParse('teacherList'));
router.post('/upload/students', upload.single('file'), uploadAndParse('studentList'));
router.post('/upload/routines', upload.single('file'), uploadAndParse('routine'));
router.post('/upload/administration', upload.single('file'), uploadAndParse('administrationList'));
router.post('/upload/mentors', upload.single('file'), uploadAndParse('mentorList'));
router.post('/upload/holidays', upload.single('file'), uploadAndParse('holiday'));

module.exports = router;