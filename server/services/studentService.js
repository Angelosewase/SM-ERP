const { StudentModel, ClassModel } = require("../models/Schemas");

const promoteStudent = async (studentId, fromClassId, toClassId) => {
  
    try {
      const session = await StudentModel.startSession();
      await session.startTransaction();

      try {
        const student = await StudentModel.findById(studentId).session(session);
        if (!student) {
          throw new Error('Student not found');
        }

        if (student.classId.toString() !== fromClassId) {
          throw new Error("Student is not currently in the specified class");
        }

        student.classId = toClassId;
        await student.save({ session });

        await ClassModel.findByIdAndUpdate(
          fromClassId,
          { $pull: { students: studentId } },
          { session }
        );

        await ClassModel.findByIdAndUpdate(
          toClassId, 
          { $push: { students: studentId } },
          { session }
        );

        await session.commitTransaction();
        return { message: "Student promoted successfully" };

      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }

    } catch (error) {
      console.error("Error promoting student:", error.message);
      throw error;
    }
  };



  module.exports = {promoteStudent}