import { IStudent } from "@/app/globals";
import { Student } from "@/components/tables/student/StudentsTable";

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
