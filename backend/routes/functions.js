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
    getTeacherRoutine,
    postTeacherRoutine,
    deleteSpecificTeacherRoutine
} = require('../controllers/teacherRoutineController.js');
const {
    getStudentRoutine,
    postStudentRoutine,
    deleteSpecificStudentRoutine
} = require('../controllers/studentRoutineController.js');

//get requests
router.get('/TeacherList', getTeacherList);
router.get('/StudentList', getStudentList);
router.get('/TeacherRoutine', getTeacherRoutine);
router.get('/StudentRoutine', getStudentRoutine);

//post requests
router.post('/TeacherList', postTeacherData);
router.post('/StudentList', postStudentData);
router.post('/TeacherRoutine', postTeacherRoutine);
router.post('/StudentRoutine', postStudentRoutine);

//delete requests
router.delete('/TeacherList/:id', deleteTeacherData);
router.delete('/StudentList/:id', deleteStudentData);
router.delete('/TeacherRoutine/:id', deleteSpecificTeacherRoutine);
router.delete('/StudentRoutine/:id', deleteSpecificStudentRoutine);

module.exports = router;