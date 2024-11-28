const { z } = require("zod");
const mongoose = require("mongoose");
const { objectIdValidator } = require("./user.validator");

const createClassValidator = z.object({
  name: z.string().min(3, "Class name must be at least 3 characters"),
  students: z
    .array(
      z
        .string()
        .refine(
          (id) => mongoose.Types.ObjectId.isValid(id),
          "Invalid student ID"
        )
    )
    .optional(),
  subjects: z
    .array(
      z
        .string()
        .refine(
          (id) => mongoose.Types.ObjectId.isValid(id),
          "Invalid subject ID"
        )
    )
    .optional(),
  schoolId: objectIdValidator,
});

const updateClassValidator = z.object({
  name: z
    .string()
    .min(3, "Class name must be at least 3 characters")
    .optional(),
  students: z
    .array(
      z
        .string()
        .refine(
          (id) => mongoose.Types.ObjectId.isValid(id),
          "Invalid student ID"
        )
    )
    .optional(),
  subjects: z
    .array(
      z
        .string()
        .refine(
          (id) => mongoose.Types.ObjectId.isValid(id),
          "Invalid subject ID"
        )
    )
    .optional(),
});

const promoteClassInofValidator = z.object({
  classId: z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "invalid classId "
    ),
  newClassId: z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "invalid classId "
    ),
});

module.exports = { createClassValidator, updateClassValidator, promoteClassInofValidator};
