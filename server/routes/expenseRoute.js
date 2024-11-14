const express = require("express");
const {
  createExpenseRecord,
  getAllExpenseRecords,
  getExpenseRecordById,
  updateExpenseRecord,
  deleteExpenseRecord,
} = require("../controllers/expenseController");
const router = express.Router();
const {authenticate} = require("../controllers/authController")
router.use(authenticate);
const cacheMiddleware = require("../cache/middleware/cacheMiddleware");

router.post("", createExpenseRecord);
router.get("", cacheMiddleware(300), getAllExpenseRecords);
router.get("/:id", cacheMiddleware(300), getExpenseRecordById);
router.put("/:id", updateExpenseRecord);
router.delete("/:id", deleteExpenseRecord);

module.exports = router;
