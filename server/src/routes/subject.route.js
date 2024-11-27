const express = require("express");

const {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  getSubjectsByClassId,
} = require("../controllers/subject.controller");
const {authenticate} = require("../middlewares/auth");
const cacheMiddleware = require("../cache/middleware/cache.middleware");

const router = express.Router();
router.use(authenticate);

router.post("/", createSubject);
router.get("/", cacheMiddleware(300), getAllSubjects);
router.get("/class/:classId", cacheMiddleware(300), getSubjectsByClassId);

router.get("/:id", cacheMiddleware(300), getSubjectById);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

module.exports = router;
