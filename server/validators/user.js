const { z } = require('zod');

const loginInfoValidator = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

const registerUserInfoValidator = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"), 
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["admin", "teacher"], {
    errorMap: () => ({ message: "Role must be either 'admin' or 'teacher'" }).optional()
  })
});
const objectIdValidator = z.string().refine(
  (value) => mongoose.Types.ObjectId.isValid(value),
  "Invalid ID"
);



module.exports = { 
  loginInfoValidator, 
  registerUserInfoValidator, 
  objectIdValidator
};
