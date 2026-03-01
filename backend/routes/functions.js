const router = require('express').Router();

// File References
const {
    getTeacherList,
    postTeacherData,
    deleteTeacherData
} = require('../controllers/teacherListController.js');
const {
    getStudentList,
    postStudentData,
    deleteStudentData
} = require('../controllers/studentListController.js');
const {
    getRoutine,
    postRoutine,
    deleteSpecificRoutine
} = require('../controllers/routineController.js');

const { 
    getAnnouncements, 
    postAnnouncement, 
    deleteAnnouncement 
} = require('../controllers/adminController.js')

const { 
    getAdministrationList, 
    postAdministrationData, 
    deleteAdministrationData 
} = require('../controllers/administrationListController.js')

const {
    getMentorList,
    getMentorById,
    postMentorData,
    deleteMentorData
} = require('../controllers/mentorListController.js')

const {
    getHolidays,
    postHoliday,
    deleteSpecificHoliday
} = require('../controllers/holidayController.js')

const { requireAuth } = require('../controllers/authController.js');

//get requests
router.get('/TeacherList', getTeacherList);
router.get('/StudentList', getStudentList);
router.get('/AdministrationList', getAdministrationList);
router.get('/MentorList', getMentorList);
router.get('/MentorList/:id', getMentorById);
router.get('/Routine', getRoutine);
router.get('/Announcement', getAnnouncements);
router.get('/Holiday', getHolidays);

//post requests
router.post('/TeacherList', postTeacherData);
router.post('/StudentList', postStudentData);
router.post('/AdministrationList', postAdministrationData);
router.post('/MentorList', postMentorData);
router.post('/Routine', postRoutine);
router.post('/Announcement', requireAuth, postAnnouncement);
router.post('/Holiday', postHoliday);

//delete requests
router.delete('/TeacherList/:id', deleteTeacherData);
router.delete('/StudentList/:id', deleteStudentData);
router.delete('/AdministrationList/:id', deleteAdministrationData);
router.delete('/MentorList/:id', deleteMentorData);
router.delete('/Routine/:id', deleteSpecificRoutine);
router.delete('/Announcement/:id', deleteAnnouncement);
router.delete('/Holiday/:id', deleteSpecificHoliday);

module.exports = router;