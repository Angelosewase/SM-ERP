const express = require("express");
const {
  createExpenseRecord,
  getAllExpenseRecords,
  getExpenseRecordById,
  updateExpenseRecord,
  deleteExpenseRecord,
} = require("../controllers/expenseController");
const router = express.Router();
// const {isAuth} = require("../middlewares/authentication");
// router.use(isAuth)


router.post("", createExpenseRecord);
router.get("", getAllExpenseRecords);
router.get("/:id", getExpenseRecordById);
router.put("/:id", updateExpenseRecord);
router.delete("/:id", deleteExpenseRecord);

module.exports = router;
