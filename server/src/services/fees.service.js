const {
  StudentModel,
  FeeModel,
  PaymentModel,
  FeeGroupModel,
  FeesAssignmentModel,
  FinancialTransactionModel,
} = require("../models/Schemas");

async function recordFeesPayment(
  studentId,
  amount,
  feesId,
  paymentMethod,
  feesGroup
) {
  try {
    // Validate input parameters
    if (!studentId || !amount || !feesId || !feesGroup) {
      throw new Error("Missing required parameters");
    }

    if (amount < 1) {
      throw new Error("Amount must be greater than 0");
    }

    // Find and validate student
    const student = await StudentModel.findById(studentId);
    if (!student) {
      throw new Error(`No student found with ID: ${studentId}`);
    }

    // Find and validate fees
    const fees = await FeeModel.findById(feesId);
    if (!fees) {
      throw new Error(`No fees found with ID: ${feesId}`);
    }

    // Find and validate fee group
    const feeGroup = await FeeGroupModel.findById(feesGroup);
    if (!feeGroup) {
      throw new Error(`No fee group found with ID: ${feesGroup}`);
    }

    // Validate fee belongs to fee group
    if (!feeGroup.fees.includes(feesId)) {
      throw new Error(
        `Fee with ID: ${feesId} is not assigned to the given fee group`
      );
    }

    // Get fees assigned to student's class
    const feesAssigned = await FeesAssignmentModel.find({
      classId: student.classId,
    }).populate("feesGroups");

    if (!feesAssigned || feesAssigned.length === 0) {
      throw new Error("No fees assigned to the student's class");
    }

    // Validate fee is assigned to student
    const isFeeAssigned = feesAssigned.some((assignment) =>
      assignment.feesGroups.some((group) => group.fees.includes(feesId))
    );

    if (!isFeeAssigned) {
      throw new Error(`Fee with ID: ${feesId} is not assigned to the student`);
    }

    // Create transaction record
    const payment = new FinancialTransactionModel({
      schoolId: student.schoolId,
      studentId,
      feesId,
      amount,
      paymentMethod: paymentMethod || "cash",
      feeGroup: feesGroup,
      status: amount >= fees.amount ? "paid" : "pending",
    });

    await payment.save();

    // Find or create payment status
    let paymentStatus = await PaymentModel.findOne({ studentId });
    if (!paymentStatus) {
      paymentStatus = await createPaymentStatus(studentId, student.classId);
    }

    // Update payment status based on amount
    const status = amount >= fees.amount ? "paid" : "pending";
    await updatePaymentStatus(studentId, feesId, status);

    return payment;
  } catch (error) {
    throw new Error(`Failed to record fees payment: ${error.message}`);
  }
};

const createPaymentStatus = async (studentId, classId) => {
  try {
    // Validate input parameters
    if (!studentId || !classId) {
      throw new Error("Missing required parameters");
    }

    // Check if student and class exist
    const [student, classDoc] = await Promise.all([
      StudentModel.findById(studentId),
      ClassModel.findById(classId),
    ]);

    if (!student || !classDoc) {
      throw new Error(
        `No student or class found with ID: ${studentId} or ${classId}`
      );
    }

    // Get fees assignments for the class
    const feesAssigned = await FeesAssignmentModel.find({
      classId,
    }).populate("feesGroups");

    if (!feesAssigned || feesAssigned.length === 0) {
      throw new Error("No fees assigned to the given class");
    }

    // Extract all fees from fee groups
    const feesArray = feesAssigned.reduce((allFees, assignment) => {
      assignment.feesGroups.forEach((group) => {
        allFees.push(...group.fees);
      });
      return allFees;
    }, []);

    // Create and save new payment status
    const studentFeeStatus = new PaymentModel({
      studentId,
      feesToBePaid: feesArray,
      feesPaid: [],
      pendingFeesPayments: feesArray,
    });

    await studentFeeStatus.save();
    return studentFeeStatus;
  } catch (error) {
    console.error("Error creating fee status:", error.message);
    throw error;
  }
};
const updatePaymentStatus = async (studentId, feesId, status) => {
  try {

    if (!studentId || !feesId || !status) {
      throw new Error("Missing required parameters");
    }

    if (!['paid', 'pending'].includes(status)) {
      throw new Error("Invalid status. Must be 'paid' or 'pending'");
    }

    const paymentStatus = await PaymentModel.findOne({ studentId });
    if (!paymentStatus) {
      throw new Error("No payment status found for this student");
    }

    if (status === 'paid') {

      const feeIndex = paymentStatus.pendingFeesPayments.findIndex(
        (feeId) => feeId.toString() === feesId
      );

      if (feeIndex === -1) {
        throw new Error("Fee not found in pending payments");
      }

      const paidFee = paymentStatus.pendingFeesPayments[feeIndex];
      paymentStatus.pendingFeesPayments.splice(feeIndex, 1);
      paymentStatus.feesPaid.push(paidFee);

    } else {
      const feeIndex = paymentStatus.feesPaid.findIndex(
        (feeId) => feeId.toString() === feesId
      );

      if (feeIndex === -1) {
        throw new Error("Fee not found in paid fees");
      }

      const pendingFee = paymentStatus.feesPaid[feeIndex];
      paymentStatus.feesPaid.splice(feeIndex, 1);
      paymentStatus.pendingFeesPayments.push(pendingFee);
    }

    await paymentStatus.save();
    const feesStatus = paymentStatus.pendingFeesPayments.length === 0 ? "paid" : "pending";
    await StudentModel.findByIdAndUpdate(studentId, { feesStatus });

    return paymentStatus;
  } catch (error) {
    console.error("Error updating payment status:", error.message);
    throw error;
  }
};

module.exports = {
  recordFeesPayment,
  createPaymentStatus,
  updatePaymentStatus,
};
