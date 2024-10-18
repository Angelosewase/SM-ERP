import { z } from "zod";

export const subjectNameValidator = z.string().min(1, "Name is required");
export const teacherIdValidator = z.string().min(1, "Teacher ID is required");
export const descriptionValidator = z.string().optional();
export const classIdsValidator = z.array(z.string()).optional();
export const daysValidator = z.array(
  z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
).optional();
export const schoolIdValidator = z.string().optional();
export const createSubjectValidator = z.object({
  name: subjectNameValidator,
  teacherId: teacherIdValidator,
  description: descriptionValidator,
  classes: classIdsValidator,
  days: daysValidator,
  schoolId: schoolIdValidator,
});

export const updateSubjectValidator = createSubjectValidator.partial();
