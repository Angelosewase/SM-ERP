const { z } = require("zod");
const mongoose = require("mongoose");

// Validator for creating a teacher
const createTeacherValidator = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  schoolId: z
    .string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid School ID"),
  subjects: z
    .array(
      z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid Subject ID")
    )
    .min(1, "At least one subject is required"),
  classes: z
    .array(
      z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid Class ID")
    )
    .min(1, "At least one class is required"),
});

// Validator for updating a teacher (all fields are optional)
const updateTeacherValidator = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters").optional(),
  lastName: z.string().min(3, "Last name must be at least 3 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  schoolId: z
    .string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid School ID")
    .optional(),
  subjects: z
    .array(
      z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid Subject ID")
    )
    .optional(),
  classes: z
    .array(
      z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid Class ID")
    )
    .optional(),
});

// Validator for teacher ID (for delete and single teacher retrieval)
const teacherIdValidator = z.string().refine(
  (id) => mongoose.Types.ObjectId.isValid(id),
  "Invalid Teacher ID"
);

module.exports = {
  createTeacherValidator,
  updateTeacherValidator,
  teacherIdValidator,
};
