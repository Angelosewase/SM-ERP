const { z } = require("zod");
const mongoose = require("mongoose");
const loginInfoValidator = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const registerUserInfoValidator = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z
    .enum(["admin", "teacher"], {
      errorMap: () => ({ message: "Role must be either 'admin' or 'teacher'" }),
    })
    .optional(),
});
const objectIdValidator = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), "Invalid ID");


  const userUpdateSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    school: z.string().optional(), // Assuming school is a string ID
    role: z.enum(["admin", "teacher"]).optional(), // Ensure only valid roles are allowed
    teacher: z.string().optional(), // Assuming teacher is a string ID
  });

module.exports = {
  loginInfoValidator,
  registerUserInfoValidator,
  objectIdValidator,
  userUpdateSchema
};
