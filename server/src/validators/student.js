const { Mongoose, default: mongoose } = require("mongoose");
const { z } = require("zod");

const registerStudentValidator = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email("Invalid email").optional(),
  schoolId: z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "Invalid school ID"
    ),
  gender: z.enum(["male", "female"]),
  classId: z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "Invalid class ID"
    ),
  parents: z
    .array(
      z
        .string()
        .refine(
          (value) => mongoose.Types.ObjectId.isValid(value),
          "Invalid parent ID"
        )
    )
    .optional(),
});

const updateStudentValidator = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  schoolId: z.string().optional(),
  classId: z.string().optional(),
  parents: z.array(z.string()).optional(),
  gender: z.enum(["male", "female"]).optional(),
});

const promoteStudentValidator = z.object({
  studentId: z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "invalid studentId"
    ),
  fromClassId: z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "invalid studentId"
    ),
  toClassId: z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "invalid studentId"
    ),
});

module.exports = { registerStudentValidator, updateStudentValidator , promoteStudentValidator};
