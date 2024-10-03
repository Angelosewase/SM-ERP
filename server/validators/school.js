const { z } = require('zod');

// School validation schema using Zod
const schoolValidationSchema = z.object({
  name: z.string().min(3, "School name must be at least 3 characters long"),
  address: s.string().min(3 , "address must be atleast three characters"),
  email: z.string().min(5, "email  number must be at least 5 digits"),
  admin: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), "Invalid admin ID"),
});


modules.export ={schoolValidationSchema}