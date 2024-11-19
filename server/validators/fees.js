const { z } = require("zod");
const schoolIdValidator = z.string().min(1, "School ID is required");
const classIdValidator = z.string().optional();
const feeTypeValidator = z.string().min(2, "Fee type is required");
const amountValidator = z.number()
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
  amount: amountValidator,
  fees: z.array(z.string()).min(1, "Fees are required"),
});

const updateFeeGroupValidator = createFeeGroupValidator.partial();

module.exports = {
  createFeeValidator,
  updateFeeGroupValidator,
  updateFeeValidator,
  createFeeGroupValidator,
};
