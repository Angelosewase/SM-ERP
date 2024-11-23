const { StudentModel, ClassModel, FeesAssignmentModel } = require("../models/Schemas");

const promoteStudent = async (studentId, fromClassId, toClassId) => {
  try {
    const session = await StudentModel.startSession();
    await session.startTransaction();

    try {
      const student = await StudentModel.findById(studentId).session(session);
      if (!student) {
        throw new Error("Student not found");
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

const verifyTheStudentFees = async (studentId) => {
  try {
    const student = await StudentModel.findById(studentId);
    if (!student) {
      throw new Error(`no student with Id:${studentId}  provided`);
    }
    const FeesAssigned = await FeesAssignmentModel.findOne({
      classId: student.classId
    });
    if (!FeesAssigned) {
      throw new Error("no fees assigned to the given student");
    }

    const fees = await FinancialTransactionModel.find({
      studentId: student._id
    });

    const isAllFeesPayed = fees.every(fee => fee.status === "paid");
    if (!isAllFeesPayed) {
      throw new Error("some fees are not payed"); 
    }

    student.feesStatus = "paid";
    await student.save();
    return { message: "all fees are payed" };

  } catch (error) {
    console.error("Error verifying student fees:", error.message);
    throw error;
  }
};

module.exports = { promoteStudent , verifyTheStudentFees};
