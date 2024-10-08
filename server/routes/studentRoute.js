const express = require('express');
const { getStudents, createStudent, deleteStudent, updateStudent } = require('../controllers/studentController');

const router = express.Router();

router.get('/', getStudents);
router.post('/', createStudent);
router.delete('/:id', deleteStudent);
router.put('/:id', updateStudent);

module.exports = router;
