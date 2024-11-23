const {
  StudentModel,
  FeeModel,
  PaymentModel,
  FeeGroupModel,
  FeesAssignmentModel,
  FinancialTransactionModel,
} = require("../models/Schemas");

const recordFeesPayment = async (
  studentId,
  amount,
  feesId,
  paymentMethod,
  feesGroup
) => {
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

    // Update payment status
    const paymentStatus = await PaymentModel.findOne({
      studentId,
    });
    if (paymentStatus) {
      if (amount >= fees.amount) {
        paymentStatus.feesPaid.push(feesId);
      } else {
        paymentStatus.pendingFeesPayments.push(feesId);
      }
      await paymentStatus.save();
    } else {
      const newPaymentStatus = new PaymentModel({
        studentId,
        feesToBePaid: feesAssigned.reduce((allFees, assignment) => {
          assignment.feesGroups.forEach((group) => {
            allFees.push(...group.fees);
          });
          return allFees;
        }, []),
        pendingFeesPayments: amount < fees.amount ? [feesId] : [],
        feesPaid: amount >= fees.amount ? [feesId] : [],
      });
      await newPaymentStatus.save();
    }

    return payment;
  } catch (error) {
    throw new Error(`Failed to record fees payment: ${error.message}`);
  }
};

module.exports = {
  recordFeesPayment,
};
