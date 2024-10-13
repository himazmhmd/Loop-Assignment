const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/students', studentController.addStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);
router.get('/students', studentController.getStudents);
router.get('/allStudents', studentController.getAllStudents);
router.get('/students/top-rankers', studentController.getTopRankers);
router.get('/students/by-grade', studentController.getStudentsByGrade);

module.exports = router;
