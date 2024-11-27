const { default: mongoose } = require("mongoose");
const { z } = require("zod");
const { FeeGroupModel } = require("../models/Schemas");
const schoolIdValidator = z
  .string()
  .min(1, "School ID is required")
  .refine((val) => mongoose.Types.ObjectId.isValid(val), "Invalid school ID");
const classIdValidator = z.string().optional();
const feeTypeValidator = z.string().min(2, "Fee type is required");
const amountValidator = z.number();
const dueDateValidator = z.date({
  required_error: "Due date is required",
  invalid_type_error: "Due date must be a valid date",
});

const createFeeValidator = z.object({
  schoolId: schoolIdValidator,
  classId: classIdValidator,
  feeType: feeTypeValidator,
  amount: amountValidator,
});

const updateFeeValidator = createFeeValidator.partial();

const nameValidator = z.string().min(1, "Name is required");

const descriptionValidator = z.string().optional();
const createFeeGroupValidator = z.object({
  name: nameValidator,
  description: descriptionValidator,
  schoolId: schoolIdValidator,
  fees: z
    .array(z.string())
    .min(1, "Fees are required")
    .refine(
      (values) => values.every((val) => mongoose.Types.ObjectId.isValid(val)),
      "Invalid fee id"
    ),
});

const updateFeeGroupValidator = createFeeGroupValidator.partial();

const feesAssignmentValidator = z.object({
  schoolId: schoolIdValidator,
  classId: z
    .string()
    .min(1, "class ID is required")
    .refine((val) => mongoose.Types.ObjectId.isValid(val), "Invalid class ID"),
  feesGroups: z.array(
    z
      .string()
      .min(1, "Fee group ID is required")
      .refine(
        (val) => mongoose.Types.ObjectId.isValid(val),
        "Invalid fee group ID"
      )
      .refine(async (val) => {
        if (!(await FeeGroupModel.findById(val))) {
          return  false ;
        }
        return true;
      }, "Invalid fee group")
  ),
});

module.exports = {
  createFeeValidator,
  updateFeeGroupValidator,
  updateFeeValidator,
  createFeeGroupValidator,
  feesAssignmentValidator,
};
