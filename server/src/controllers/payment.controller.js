const {
  invalidateSchoolCache,
} = require("../cache/services/cacheInvalidation");
const {
  recordFeesPayment,
  createPaymentStatus,
  resetPaymentStatus,
} = require("../services/fees.service");

async function createStudentPaymentStatus(req, res) {
  try {
    const { studentId, classId } = req.body;
    await createPaymentStatus(studentId, classId);
    await invalidateSchoolCache(req.user.schoolId, [
      `/student/${studentId}/fees-payment-status`,
      `class/${classId}/fees-payment-status`,
    ]);
    res.status(200).json({ message: "Payment recorded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error recording payment", error });
  }
}

async function updateStudentPaymentStatus(req, res) {
  try {
    const { studentId, classId, status } = req.body;
    await updatePaymentStatus(studentId, classId, status);
    res.status(200).json({ message: "Payment recorded successfully" });
    await invalidateSchoolCache(req.user.schoolId, [
      `/student/${studentId}/fees-payment-status`,
      `class/${classId}/fees-payment-status`,
    ]);
  } catch (error) {
    res.status(500).json({ message: "Error recording payment", error });
  }
}

async function resetStudentPaymentStatus(req, res) {
  const { studentId } = req.params;
  if (!studentId) {
    return res.status(400).json({ error: "student id is required" });
  }
  try {
    await resetPaymentStatus(studentId);
    res.status(200).json({ message: "Payment recorded successfully" });
    await invalidateSchoolCache(req.user.schoolId, [
      `/student/${studentId}/fees-payment-status`,
      `class/${classId}/fees-payment-status`,
    ]);
  } catch (error) {
    res.status(500).json({ message: "Error recording payment", error });
  }
}
async function deleteStudentPaymentStatus(req, res) {
  const { studentId } = req.params;
  if (!studentId) {
    return res.status(400).json({ error: "student id is required" });
  }
  try {

    await PaymentModel.findOneAndDelete({ studentId });
    res.status(200).json({ message: "Payment recorded successfully" });
    await invalidateSchoolCache(req.user.schoolId, [
      `/student/${studentId}/fees-payment-status`,
      `class/${classId}/fees-payment-status`,
    ]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting student's payment", error });
  }
}

async function recordFeesPaymentController(req, res) {
  try {
    const { studentId, amount, feesId, paymentMethod, feesGroup } = req.body;
    await recordFeesPayment(
      studentId,
      amount,
      feesId,
      paymentMethod,
      feesGroup
    );
    await invalidateSchoolCache(req.user.schoolId, [
      `/student/${studentId}/fees-payment-status`,
      `class/${classId}/fees-payment-status`,
    ]);
    res.status(200).json({ message: "Fees payment recorded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error recording fees payment", error });
  }
}

module.exports = {
  createStudentPaymentStatus,
  updateStudentPaymentStatus,
  resetStudentPaymentStatus,
  deleteStudentPaymentStatus,
  recordFeesPaymentController,
};
