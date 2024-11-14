const express = require('express')

const {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");
const {authenticate} = require("../controllers/authController")

const router = express.Router();
router.use(authenticate)

router.post("/", createSubject);
router.get("/", getAllSubjects);

router.get("/:id", getSubjectById);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);
module.exports = router;
