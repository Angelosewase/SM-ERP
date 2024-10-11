const { StudentModel, FeeModel, PaymentModel } = require("../models/Schemas");

const assignFeesToStudent = async (studentId, classId) => {
  try {
    const fees = await FeeModel.find({ classId });

    if (!fees.length) {
      throw new Error("No fees found for this class");
    }

    await StudentModel.findByIdAndUpdate(studentId, {
      $push: { fees: { $each: fees.map((fee) => fee._id) } },
    });

    return { message: "Fees assigned to student successfully" };
  } catch (error) {
    console.error("Error assigning fees:", error);
    throw error;
  }
};

const recordPayment = async (studentId, feeId, amountPaid) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) throw new Error("Student not found");

    const payment = new PaymentModel({
      studentId,
      feeId,
      amountPaid,
    });

    await payment.save();
    student.balance -= amountPaid;
    await student.save();

    return { message: "Payment recorded successfully" };
  } catch (error) {
    console.error("Error recording payment:", error);
    throw error;
  }
};

const checkFeeStatus = async (studentId) => {
  try {
    const student = await Student.findById(studentId).populate("fees");

    if (!student) throw new Error("Student not found");

    const unpaidFees = student.fees.filter((fee) => student.balance > 0);
    if (unpaidFees.length) {
      return { message: `Student has outstanding fees of ${student.balance}` };
    } else {
      return { message: "All fees paid" };
    }
  } catch (error) {
    console.error("Error checking fee status:", error);
    throw error;
  }
};

module.exports = { assignFeesToStudent, recordPayment, checkFeeStatus };
