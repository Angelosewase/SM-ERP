const express = require('express');
const { getTeachers, createTeacher, deleteTeacher, updateTeacher } = require('../controllers/TeacherController');

const {isAuth}= require("../middlewares/authentication")
router.use(isAuth)

const router = express.Router();

router.get('/', getTeachers);
router.post('/', createTeacher);
router.delete('/:id', deleteTeacher);
router.put('/:id', updateTeacher);

module.exports = router;
