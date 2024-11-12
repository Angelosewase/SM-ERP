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
// const { isAuth } = require("../middlewares/authentication");

const FeesRouter = express.Router();
// FeesRouter.use(isAuth);
const feesGroupRouter = express.Router()

FeesRouter.post("/", createFee);
FeesRouter.get("/", getFeesBySchool);
FeesRouter.get("/:id", getFeeById);
FeesRouter.put("/:id", updateFee);
FeesRouter.delete("/:id", deleteFee);

//
feesGroupRouter.post("/", createFeeGroup);
feesGroupRouter.get("/", getFeeGroupsBySchool);
feesGroupRouter.get("/:id", getFeeGroupById);
feesGroupRouter.put("/:id", updateFeeGroup);
feesGroupRouter.delete("/:id", deleteFeeGroup);

module.exports = {FeesRouter, feesGroupRouter};
