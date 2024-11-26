const { z } = require("zod");
const mongoose = require("mongoose");
const expenseRecordSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.number().min(0, "Amount must be greater than or equal to 0"),
  transactionType: z.enum(["income", "expense"]),
  status: z.enum(["paid", "pending", "overdue"]).optional(),
  paymentDate: z.date().optional(),
});
const createExpenseRecordValidator = expenseRecordSchema.extend({
  schoolId: z
    .string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid School ID"),
});

const updateExpenseRecordValidator = expenseRecordSchema.partial();
const getExpenseRecordByIdValidator = z.object({
  id: z.string().min(1, "ID is required"),
});
const deleteExpenseRecordValidator = z.object({
  id: z.string().min(1, "ID is required"),
});

module.exports = {
  createExpenseRecordValidator,
  updateExpenseRecordValidator,
  getExpenseRecordByIdValidator,
  deleteExpenseRecordValidator,
};
