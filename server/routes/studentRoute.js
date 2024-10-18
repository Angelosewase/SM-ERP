const express = require("express");
const {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  promoteStudentHandler,
  getStudentbyStudentId,
  uploadStudentImage,
} = require("../controllers/studentController");
const { uploadSingle } = require("../middlewares/multer");
const router = express.Router();
router.get("/", getStudents);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);
router.get("/:id", getStudentbyStudentId);
router.put("/:id", updateStudent);
router.post("/promoteStudent", promoteStudentHandler);
router.post("/upload/:id", uploadSingle, uploadStudentImage);

module.exports = router;
