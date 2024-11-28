const mongoose = require("mongoose");
const {
  ClassModel,
  StudentModel,
  FeesAssignmentModel,
  FeeGroupModel,
  PaymentModel,
} = require("../models/Schemas");
const { feesAssignmentValidator } = require("../validators/fees.validator");

const promoteClass = async (classId, newClassId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const oldClass = await ClassModel.findById(classId)
      .populate("students")
      .session(session);
    if (!oldClass) {
      return { message: "Old class not found" };
    }
    const studentIds = oldClass.students.map((student) => student._id);

    if (!studentIds.length) {
      return { message: "No students to promote in this class" };
    }

    await StudentModel.updateMany(
      { _id: { $in: studentIds } },
      { $set: { classId: newClassId } },
      { session }
    );
    oldClass.students = oldClass.students.filter(
      (student) => !studentIds.includes(student._id)
    );
    await oldClass.save({ session });
    const newClass = await ClassModel.findById(newClassId).session(session);
    newClass.students.push(...studentIds);
    await newClass.save({ session });

    await session.commitTransaction();

    return {
      message: "Class promotion successful, students moved to new class",
    };
  } catch (error) {
    await session.abortTransaction();
    throw new Error("Class promotion failed");
  } finally {
    session.endSession();
  }
};

function convertClassesToValueNamePairs(classes) {
  return classes.map(function (classObj) {
    return {
      value: classObj._id,
      name: classObj.name,
    };
  });
}

async function assignFeesToClass(classId, feesGroups) {
  //create a mongoose session
  const session = mongoose.startSession();
  session.startTransaction();
  try {
    const Class = await ClassModel.findById(classId);
    if (!Class) {
      throw new Error("Class not found");
    }
    const validateData = await feesAssignmentValidator.parseAsync({
      schoolId: Class.schoolId,
      classId,
      feesGroups,
    });
    const classAssignedFees = new FeesAssignmentModel(validateData);

    //find all the students
    const students = await StudentModel.find({ classId: Class._id });
    const fees = feesGroups.map(async (feeGroupId) => {
      const feeGroup = await FeeGroupModel.findById(feeGroupId);
      if (!feeGroup) {
        throw new Error(`Fee group with id ${feeGroupId} not found`);
      }
      return feeGroup.fees;
    });

    students.forEach(async (student) => {
      const StudentPaymentData = await PaymentModel.findOne({
        studentId: student._id,
      });
      if (!StudentPaymentData) {
        await PaymentModel.create({
          studentId: student._id,
          pendingFeesPayments: fees,
          feesToBePaid: fees,
        });
      } else {
        StudentPaymentData.pendingFeesPayments.push(...fees);
        StudentPaymentData.feesToBePaid.push(...fees);
        await StudentPaymentData.save({ session });
      }
    });

    await classAssignedFees.save({ session });
    await session.commitTransaction();
    return classAssignedFees;
  } catch (error) {
    console.error("Error assigning fees to class:", error);
    (await session).abortTransaction();
    throw new Error("Failed to assign fees to class");
  }
}

//function to remove fees groups from the class

async function removeFees(classId, feesGroups) {
  const session = mongoose.startSession();
  if (!classId) {
    throw new Error("Class id is required");
  }
  try {
    const Class = await ClassModel.findById(classId);
    if (!Class) {
      throw new Error("class not found");
    }

    await FeesAssignmentModel.updateMany(
      { classId },
      { $pull: { feesGroups: { $in: feesGroups } } },
      { session }
    );
    const fees = feesGroups.map(async (feeGroupId) => {
      const feeGroup = await FeeGroupModel.findById(feeGroupId);
      if (!feeGroup) {
        throw new Error(`Fee group with id ${feeGroupId} not found`);
      }
      return feeGroup.fees;
    });

    const students = await StudentModel.find({ classId: Class._id });
    students.forEach(async (student) => {
      const StudentPaymentData = await PaymentModel.findOne({
        studentId: student._id,
      });
      if (!StudentPaymentData) {
        throw new Error("student payment data not found ");
      }
      await PaymentModel.updateMany(
        { studentId: student._id },
        {
          $pullAll: {
            feesToBePaid: fees,
            pendingFeesPayments: fees,
          },
        },
        { session }
      );
      return;
    });
  } catch (error) {
    (await session).abortTransaction();
    throw new Error("Failed to remove fees from class", error);
  }
}

module.exports = {
  promoteClass,
  convertClassesToValueNamePairs,
  assignFeesToClass,
  removeFees
};
