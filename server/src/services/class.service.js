const mongoose = require("mongoose");
const {
  ClassModel,
  StudentModel,
  FeesAssignmentModel,
  FeeGroupModel,
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
      const feeGroup = FeeGroupModel.findById(feeGroupId);
      return feeGroup.fees.map((feeId) => feeId);
    });

    //for each student check for possible fees payment
    //create a student fees record containing the fees

    await classAssignedFees.save({ session });
    await session.commitTransaction();
    return classAssignedFees;
  } catch (error) {
    console.error("Error assigning fees to class:", error);
    throw new Error("Failed to assign fees to class");
  }
}

module.exports = {
  promoteClass,
  convertClassesToValueNamePairs,
  assignFeesToClass,
};
