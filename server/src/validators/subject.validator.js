const { z } = require("zod");
const mongoose = require("mongoose");
const { TeacherModel, ClassModel } = require("../models/Schemas");

const subjectNameValidator = z
  .string()
  .min(1, "Name is required")
  .refine((val) => val.trim() !== "", "Name cannot be all whitespace");

const teacherIdsValidator = z
  .array(
    z
      .string()
      .min(1, "Teacher ID is required")
      .refine(
        (val) => mongoose.Types.ObjectId.isValid(val),
        "Invalid teacher ID"
      )
      .refine(async (val) => {
        if (!(await TeacherModel.findById(val))) {
          return false;
        }
        return true;
      }, "Invalid teacher ID")
  )
  .min(1, "At least one teacher is required");

const descriptionValidator = z
  .string()
  .optional()
  .refine((val) => {
    if (!val) {
      return true;
    }
    return val.trim() !== "";
  }, "Description cannot be all whitespace");

const classIdsValidator = z
  .array(
    z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), "Invalid class ID")
      .refine(async (val) => {
        if (!(await ClassModel.findById(val))) {
          return false;
        }

        return true;
      }, "Invalid class ID")
  )
  .optional();

const daysValidator = z
  .array(
    z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], {
      insensitive: true,
    })
  )
  .optional();

const schoolIdValidator = z
  .string()
  .optional()
  .refine(
    (val) => !val || mongoose.Types.ObjectId.isValid(val),
    "Invalid school ID"
  );

const createSubjectValidator = z.object({
  name: subjectNameValidator,
  teachers: teacherIdsValidator,
  description: descriptionValidator,
  classes: classIdsValidator,
  days: daysValidator,
  schoolId: schoolIdValidator,
});

const updateSubjectValidator = createSubjectValidator.partial();

module.exports = {
  subjectNameValidator,
  teacherIdsValidator,
  descriptionValidator,
  classIdsValidator,
  daysValidator,
  schoolIdValidator,
  createSubjectValidator,
  updateSubjectValidator,
};
