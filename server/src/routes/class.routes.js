const express = require("express");
const router = express.Router();
const cacheMiddleware = require("../cache/middleware/cache.middleware");
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
  getClassesBySubjectId,
} = require("../controllers/class.controller");
const { authenticate } = require("../middlewares/auth");

router.use(authenticate);

// Cache GET requests for 5 minutes (300 seconds)
router.get("/", cacheMiddleware(300), getClasses);
router.get("/fmt", cacheMiddleware(300), getFormattedClasses);
router.get("/:id", cacheMiddleware(300), getClassById);
router.get(
  "/:id/fees-payment-status",
  cacheMiddleware(300),
  getStudentsFeesPaymentStatus
);
router.get("/subject/:subjectId", cacheMiddleware(300), getClassesBySubjectId);

router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);
router.post("/promote", promoteClassHandler);
router.post("/:id/assign-fees", assignFeesToClassController);
router.get(
  "/:id/fees-payment-status",
  cacheMiddleware(300),
  getStudentsFeesPaymentStatus
);

module.exports = router;
