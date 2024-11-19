const { ClassModel, StudentModel } = require("../models/Schemas");

const promoteClass = async (classId, newClassId) => {
  try {
    const oldClass = await ClassModel.findById(classId).populate("students");
    if (!oldClass) {
      return { message: "Old class not found" };
    }
    const studentIds = oldClass.students.map((student) => student._id);

    if (!studentIds.length) {
      return { message: "No students to promote in this class" };
    }

    await StudentModel.updateMany(
      { _id: { $in: studentIds } },
      { $set: { classId: newClassId } }
    );
    oldClass.students = oldClass.students.filter(
      (student) => !studentIds.includes(student._id)
    );
    await oldClass.save();
    const newClass = await ClassModel.findById(newClassId);
    newClass.students.push(...studentIds);
    await newClass.save();

    return {
      message: "Class promotion successful, students moved to new class",
    };
  } catch (error) {
    console.error("Error promoting class:", error);
    throw new Error("Class promotion failed");
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
module.exports = { promoteClass, convertClassesToValueNamePairs };
