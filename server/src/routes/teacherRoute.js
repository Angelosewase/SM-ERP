const express = require('express');
const { getTeachers, createTeacher, deleteTeacher, updateTeacher, getTeacherById, uploadTeaherImage } = require('../controllers/TeacherController');
const {authenticate} = require("../controllers/authController")
const { uploadSingle } = require('../middlewares/multer');
const cacheMiddleware = require('../cache/middleware/cacheMiddleware');

const router = express.Router();
router.use(authenticate)

router.get('/', cacheMiddleware(300), getTeachers);
router.post('/', createTeacher);
router.delete('/:id', deleteTeacher);
router.put('/:id', updateTeacher);
router.get('/:id', cacheMiddleware(300), getTeacherById);
router.post("/upload/:id", uploadSingle, uploadTeaherImage);

module.exports = router;
