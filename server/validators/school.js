const { z } = require("zod");
const mongoose = require("mongoose");

const schoolValidationSchema = z.object({
  schoolName: z.string().min(3, "School name must be at least 3 characters long"),
  address: z.string().min(3, "address must be atleast three characters"),
  email: z.string().email("Invalid email"), 
  admin: z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "Invalid admin ID"
    ),
});

module.exports = {schoolValidationSchema}
