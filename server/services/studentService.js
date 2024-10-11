const { StudentModel } = require("../models/Schemas");

const promoteStudent = async (studentId, fromClassId, toClassId) => {
    try {
      const student = await StudentModel.findById(studentId);
      if (!student) {
        throw new Error('Student not found');
      }

      if (student.classId.toString() !== fromClassId) {
        throw new Error("Student is not currently in the specified class");
      }
      student.classId = toClassId;
      await student.save();
      await ClassModel.findByIdAndUpdate(fromClassId, {
        $pull: { students: studentId },
      });

      await ClassModel.findByIdAndUpdate(toClassId, {
        $push: { students: studentId },
      });
  
      return { message: "Student promoted successfully" };
    } catch (error) {
      console.error("Error promoting student:", error.message);
      throw error;
    }
  };