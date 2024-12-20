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
} = require("../controllers/fees.controller");
const { authenticate } = require("../middlewares/auth");
const cacheMiddleware = require("../cache/middleware/cache.middleware");
const { recordFeesPaymentController } = require("../controllers/payment.controller");
const FeesRouter = express.Router();
FeesRouter.use(authenticate);
const feesGroupRouter = express.Router();
feesGroupRouter.use(authenticate);
FeesRouter.post("/", createFee);
FeesRouter.get("/", cacheMiddleware(300), getFeesBySchool);
FeesRouter.get("/:id", cacheMiddleware(300), getFeeById);
FeesRouter.put("/:id", updateFee);
FeesRouter.delete("/:id", deleteFee);
FeesRouter.post("/record-payment", recordFeesPaymentController);

feesGroupRouter.post("/", createFeeGroup);
feesGroupRouter.get("/", cacheMiddleware(300), getFeeGroupsBySchool);
feesGroupRouter.get("/:id", cacheMiddleware(300), getFeeGroupById);
feesGroupRouter.put("/:id", updateFeeGroup);
feesGroupRouter.delete("/:id", deleteFeeGroup);

module.exports = { FeesRouter, feesGroupRouter };
