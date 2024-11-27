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
  recordFeesPaymentController,
} = require("../controllers/FeesController");
const { authenticate } = require("../middlewares/auth");
const cacheMiddleware = require("../cache/middleware/cacheMiddleware");
const FeesRouter = express.Router();
FeesRouter.use(authenticate);
const feesGroupRouter = express.Router();
feesGroupRouter.use(authenticate);

//routes to manage basic operation on fees
FeesRouter.post("/", createFee);
FeesRouter.get("/", cacheMiddleware(300), getFeesBySchool);
FeesRouter.get("/:id", cacheMiddleware(300), getFeeById);
FeesRouter.put("/:id", updateFee);
FeesRouter.delete("/:id", deleteFee);
FeesRouter.post("/record-payment", recordFeesPaymentController);

//routes to handle basic operation on fees-groups
feesGroupRouter.post("/", createFeeGroup);
feesGroupRouter.get("/", cacheMiddleware(300), getFeeGroupsBySchool);
feesGroupRouter.get("/:id", cacheMiddleware(300), getFeeGroupById);
feesGroupRouter.put("/:id", updateFeeGroup);
feesGroupRouter.delete("/:id", deleteFeeGroup);

//routes to handle fees association with students
//routes to handle fees association with classes
//routes to handle fees association with school

module.exports = { FeesRouter, feesGroupRouter };
