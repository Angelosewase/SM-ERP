const express = require("express");
const {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  promoteStudentHandler,
  getStudentbyStudentId,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);
router.get("/:id", getStudentbyStudentId);
router.put("/:id", updateStudent);
router.post("/promoteStudent", promoteStudentHandler);

module.exports = router;
