const express = require('express');
const { getTeachers, createTeacher, deleteTeacher, updateTeacher, getTeacherById, uploadTeaherImage } = require('../controllers/teacher.controller');
const {authenticate} = require("../middlewares/auth");
const { uploadSingle } = require('../middlewares/multer');
const cacheMiddleware = require('../cache/middleware/cache.middleware');

const router = express.Router();
router.use(authenticate)

router.get('/', cacheMiddleware(300), getTeachers);
router.post('/', createTeacher);
router.delete('/:id', deleteTeacher);
router.put('/:id', updateTeacher);
router.get('/:id', cacheMiddleware(300), getTeacherById);
router.post("/upload/:id", uploadSingle, uploadTeaherImage);

module.exports = router;
