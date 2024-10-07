const express = require('express');
const { getTeachers, createTeacher, deleteTeacher, updateTeacher } = require('../controllers/TeacherController');

const router = express.Router();

router.get('/', getTeachers);
router.post('/', createTeacher);
router.delete('/:id', deleteTeacher);
router.put('/:id', updateTeacher);

module.exports = router;
