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


const schoolUpdateSchema = z.object({
  name: z.string().min(1, "School name is required").optional(),
  address: z.string().min(1, "Address is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  establishedYear: z.number().optional(), 
  admin: z.array(z.string()).optional(),
  teachers: z.array(z.string()).optional(), 
  students: z.array(z.string()).optional(),
  Parents: z.array(z.string()).optional(),
  classes: z.array(z.string()).optional(), 
});

module.exports = {schoolValidationSchema, schoolUpdateSchema}
