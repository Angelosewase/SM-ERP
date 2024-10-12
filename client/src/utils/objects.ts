import { IClass, IStudent, ISubject } from "@/app/globals";
import { Class } from "@/components/tables/classes/columns";
import { Student } from "@/components/tables/student/StudentsTable";
import { Subject } from "@/components/tables/subjects/table";

export const transformStudentData = (students: IStudent[]): Student[] => {
  return students.map((student: IStudent) => ({
    id: student._id || "",
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email || "",
    schoolId: student.schoolId || "",
    class: student.classId,
    parents: student.parents || [],
    gender: student.gender as "male" | "female",
  }));
};


export function transformClass(input: IClass): Class {
  return {
    _id: input._id,
    name: input.name,
    studentsCount: input.students ? input.students.length : 0, // Count students or default to 0
    subjectsCount: input.subjects ? input.subjects.length : 0, // Count subjects or default to 0
    createdAt: input.createdAt ? new Date(input.createdAt) : new Date(), // Convert createdAt to Date or default to now
  };
}

export function transformSubject(input: ISubject): Subject {
  return {
    _id: input._id,
    name: input.name,
    teacher: input.teacherId, // Directly copy teacherId as teacher
    days: input.days ? input.days.join(', ') : '', // Convert days array to comma-separated string
    classes: input.classes ? input.classes.join(', ') : '', // Convert classes array to comma-separated string
  };
}