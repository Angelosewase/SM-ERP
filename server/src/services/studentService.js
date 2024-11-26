const {
  StudentModel,
  ClassModel,
  FeesAssignmentModel,
  FinancialTransactionModel,
  PaymentModel,
} = require("../models/Schemas");

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
    // Find student
    const student = await StudentModel.findById(studentId);
    if (!student) {
      throw new Error(`no student with Id:${studentId} provided`);
    }

    // Find fees assigned to student's class
    const feesAssigned = await FeesAssignmentModel.findOne({
      classId: student.classId,
    }).populate("feesGroups");

    if (!feesAssigned) {
      throw new Error("no fees assigned to the given student");
    }

    // Get student's payment status
    const paymentStatus = await PaymentModel.findOne({ studentId });
    if (!paymentStatus) {
      throw new Error("no payment status found for student");
    }

    // Check if there are any pending payments
    if (paymentStatus.pendingFeesPayments.length > 0) {
      throw new Error("some fees are not paid");
    }

    // If we get here, all fees are paid
    student.feesStatus = "paid";
    await student.save();

    return { message: "all fees are paid" };
  } catch (error) {
    console.error("Error verifying student fees:", error.message);
    throw error;
  }
};

module.exports = { promoteStudent, verifyTheStudentFees };
