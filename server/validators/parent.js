import { z } from "zod";

// Define Zod validators for each field in the Parent schema
export const firstNameValidator = z.string().min(1, "First name is required");

export const lastNameValidator = z.string().min(1, "Last name is required");

export const emailValidator = z
  .string()
  .email("Invalid email address");

export const addressValidator = z.string().optional();

export const phoneNumberValidator = z.string().optional();

export const childValidator = z.string().optional();

export const genderValidator = z.enum(["male", "female"]);

export const schoolIdValidator = z.string().optional();

export const createParentValidator = z.object({
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  email: emailValidator,
  address: addressValidator,
  phoneNumber: phoneNumberValidator,
  child: childValidator,
  gender: genderValidator,
  schoolId: schoolIdValidator,
});

export const updateParentValidator = createParentValidator.partial();
