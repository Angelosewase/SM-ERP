const express = require("express");
const {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  promoteStudentHandler,
  getStudentbyStudentId,
  uploadStudentImage,
  getStudentsByClass,
  getStudentFeesPaymentStatus,
} = require("../controllers/studentController");
const { uploadSingle } = require("../middlewares/multer");
const {authenticate} = require("../middlewares/auth");
const cacheMiddleware = require("../cache/middleware/cacheMiddleware");
const router = express.Router();
router.use(authenticate)

router.get("/", cacheMiddleware(300), getStudents);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);
router.get("/:id", cacheMiddleware(300), getStudentbyStudentId);
router.put("/:id", updateStudent);
router.post("/promoteStudent", promoteStudentHandler);
router.post("/upload/:id", uploadSingle, uploadStudentImage);
router.get("/class/:classId", cacheMiddleware(300),getStudentsByClass);
router.get("/:id/fees-payment-status",cacheMiddleware(300), getStudentFeesPaymentStatus);

module.exports = router;
