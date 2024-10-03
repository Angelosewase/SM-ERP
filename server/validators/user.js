const { z } = require('zod');

// School validation schema using Zod
const loginInfoValidator = z.object({
  password: z.string().min(8, "School name must be at least 3 characters long"),
  email:z.string().min(3, "Invalid email ")
});


modules.export ={loginInfoValidator}