const express = require("express");
const { authenticate } = require("../middlewares/auth");
const {
  recordFeesPaymentController,
  createStudentPaymentStatus,
  resetStudentPaymentStatus,
  deleteStudentPaymentStatus,
  updateStudentPaymentStatus,
} = require("../controllers/payment.controller");

const router = express.Router();
router.use(authenticate);

router.post("/record-payment", recordFeesPaymentController),
router.post("/create-status", createStudentPaymentStatus),
router.post("/:studentId/reset-status", resetStudentPaymentStatus);
router.delete("/:studentId/delete-status", deleteStudentPaymentStatus);
router.put("/update-status", updateStudentPaymentStatus);

module.exports = router;
