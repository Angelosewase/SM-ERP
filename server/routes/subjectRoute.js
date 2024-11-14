const express = require('express')

const {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");
const {authenticate} = require("../controllers/authController")
const cacheMiddleware = require('../cache/middleware/cacheMiddleware');

const router = express.Router();
router.use(authenticate)

router.post("/", createSubject);
router.get("/", cacheMiddleware(300), getAllSubjects);

router.get("/:id", cacheMiddleware(300), getSubjectById);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);
module.exports = router;
