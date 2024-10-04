const { z } = require('zod');

// Login validation schema
const loginInfoValidator = z.object({
  email: z.string().email("Invalid email format"), // Use .email() to ensure it's an email
  password: z.string().min(8, "Password must be at least 8 characters long")
});



// Register User validation schema
const registerUserInfoValidator = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"), // Ensures it's a valid email
  password: z.string().min(8, "Password must be at least 8 characters long"),
  // role: z.enum(["admin", "teacher"], {
  //   errorMap: () => ({ message: "Role must be either 'admin' or 'teacher'" })
  // })
});



module.exports = { 
  loginInfoValidator, 
  registerUserInfoValidator, 
};
