const express = require("express");
const {
  createFee,
  getFeesBySchool,
  getFeeById,
  updateFee,
  deleteFee,
  createFeeGroup,
  getFeeGroupsBySchool,
  getFeeGroupById,
  updateFeeGroup,
  deleteFeeGroup,
} = require("../controllers/feesController");

const router = express.Router();

router.post("/", createFee);
router.get("/", getFeesBySchool);
router.get("/:id", getFeeById);
router.put("/:id", updateFee);
router.delete("/:id", deleteFee);
router.post("/groups", createFeeGroup);
router.get("/groups", getFeeGroupsBySchool);
router.get("/groups/:id",getFeeGroupById );
router.put("/groups/:id", updateFeeGroup);
router.delete("/fgroups/:id", deleteFeeGroup);

module.exports = router;
