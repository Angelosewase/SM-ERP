const express = require('express');
const { getTeachers, createTeacher, deleteTeacher, updateTeacher, getTeacherById, uploadTeaherImage } = require('../controllers/TeacherController');

// const {isAuth}= require("../middlewares/authentication");
const { uploadSingle } = require('../middlewares/multer');


const router = express.Router();
// router.use(isAuth)

router.get('/', getTeachers);
router.post('/', createTeacher);
router.delete('/:id', deleteTeacher);
router.put('/:id', updateTeacher);
router.get('/:id', getTeacherById);
router.post("/upload/:id", uploadSingle, uploadTeaherImage);

module.exports = router;
