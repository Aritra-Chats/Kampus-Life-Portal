const router = require('express').Router();
const { upload, parseAndSend } = require('../lib/multerConfig.js');

const uploadAndParse = (apiType) => async (req, res) => {
    try {
        await parseAndSend(req, res, apiType);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process upload '});
    }
};

router.post('/TeacherList', upload.single('file'), uploadAndParse('teacherList'));
router.post('/StudentList', upload.single('file'), uploadAndParse('studentList'));
router.post('/TeacherRoutine', upload.single('file'), uploadAndParse('teacherRoutine'));
router.post('/StudentRoutine', upload.single('file'), uploadAndParse('studentRoutine'));

module.exports = router;