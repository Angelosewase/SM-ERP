const express = require("express");
const router = express.Router();
const cacheMiddleware = require('../cache/middleware/cacheMiddleware');
const {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getFormattedClasses,
  promoteClassHandler,
  assignFeesToClassController,
  getStudentsFeesPaymentStatus,
} = require("../controllers/classController");
const {authenticate} = require("../controllers/authController")

router.use(authenticate);

// Cache GET requests for 5 minutes (300 seconds)
router.get("/", cacheMiddleware(300), getClasses);
router.get("/fmt", cacheMiddleware(300), getFormattedClasses);
router.get("/:id", cacheMiddleware(300), getClassById);
router.get("/:id/fees-payment-status", cacheMiddleware(300), getStudentsFeesPaymentStatus);

router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);
router.post("/promote", promoteClassHandler);
router.post("/:id/assign-fees", assignFeesToClassController);

module.exports = router;
