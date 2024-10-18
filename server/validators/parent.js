const mongoose = require("mongoose");
const  { z }  = require("zod") 

 const firstNameValidator = z.string().min(1, "First name is required");

 const lastNameValidator = z.string().min(1, "Last name is required");

 const emailValidator = z
  .string()
  .email("Invalid email address");

 const addressValidator = z.string().optional();

 const phoneNumberValidator = z.string().optional();

 const childValidator = z.string().optional();

 const genderValidator = z.enum(["male", "female"]);

 const schoolIdValidator = z.string().refine((val)=>mongoose.Types.ObjectId.isValid(val), "Invalid school ID")

 const createParentValidator = z.object({
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  email: emailValidator,
  address: addressValidator,
  phoneNumber: phoneNumberValidator,
  child: childValidator,
  gender: genderValidator,
  schoolId: schoolIdValidator,
});

 const updateParentValidator = createParentValidator.partial();

module.exports = {
  createParentValidator,
  updateParentValidator,
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  addressValidator,
  phoneNumberValidator,
  childValidator,
  genderValidator,
  schoolIdValidator
}
