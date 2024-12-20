const {
  ClassModel,
  SchoolModel,
  ScheduleModel,
  StudentModel,
  SubjectModel,
  TeacherModel,
  PaymentModel,
} = require("../models/Schemas");
const {
  createClassValidator,
  updateClassValidator,
  promoteClassInofValidator,
} = require("../validators/class.validator");
const { z } = require("zod");
const mongoose = require("mongoose");
const {
  promoteClass,
  convertClassesToValueNamePairs,
  assignFeesToClass,
} = require("../services/class.service");
const {
  invalidateSchoolCache,
} = require("../cache/services/cacheInvalidation");

const getClasses = async (req, res) => {
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const classes = await ClassModel.find({ schoolId });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFormattedClasses = async (req, res) => {
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const classes = await ClassModel.find({ schoolId });
    const resClasses = convertClassesToValueNamePairs(classes);
    res.status(200).json(resClasses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getClassById = async (req, res) => {
  const { id } = req.params;
  const idValidator = z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "Invalid class ID"
    );

  try {
    const validatedId = idValidator.parse(id);
    const classData = await ClassModel.findById(validatedId)
      .populate("students")
      .populate("subjects", "name")
      .populate("schoolId");
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClass = async (req, res) => {
  const schoolID = req.user.schoolId;
  if (!schoolID) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const validatedData = createClassValidator.parse({
      ...req.body,
      schoolId: schoolID,
    });

    const schoolId = validatedData.schoolId;

    const school = await SchoolModel.findById(schoolId);
    if (!school) {
      res.status(404).send({ message: "school not found" });
      return;
    }

    const newClass = await ClassModel.create(validatedData);
    await SchoolModel.findByIdAndUpdate(schoolID, {
      $push: { classes: newClass._id },
    });
    await invalidateSchoolCache(req.user.schoolId, ["/class"]);

    res.status(201).json(newClass);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const updateClass = async (req, res) => {
  const { id } = req.params;

  const idValidator = z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "Invalid class ID"
    );

  try {
    const validatedId = idValidator.parse(id);
    const validatedData = updateClassValidator.parse(req.body);

    const updatedClass = await ClassModel.findByIdAndUpdate(
      validatedId,
      validatedData,
      { new: true }
    ).populate("students subjects");
    if (!updatedClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    await invalidateSchoolCache(req.user.schoolId, [
      "/class",
      `/class/${req.params.id}`,
    ]);
    res.status(200).json(updatedClass);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteClass = async (req, res) => {
  const { id } = req.params;
  const idValidator = z
    .string()
    .refine(
      (value) => mongoose.Types.ObjectId.isValid(value),
      "Invalid class ID"
    );

  try {
    const validatedId = idValidator.parse(id);

    const classToDelete = await ClassModel.findById(validatedId);
    if (!classToDelete) {
      return res.status(404).json({ error: "Class not found" });
    }

    await ScheduleModel.deleteMany({ classId: classToDelete._id });

    await StudentModel.updateMany(
      { classId: classToDelete._id },
      { $unset: { classId: "" } }
    );
    await SubjectModel.updateMany(
      { classes: classToDelete._id },
      { $pull: { classes: classToDelete._id } }
    );

    await TeacherModel.updateMany(
      { classes: classToDelete._id },
      { $pull: { classes: classToDelete._id } }
    );

    await SchoolModel.findByIdAndUpdate(classToDelete.schoolId, {
      $pull: { classes: classToDelete._id },
    });

    const deletedClass = await ClassModel.findByIdAndDelete(validatedId);
    await invalidateSchoolCache(req.user.schoolId, [
      "/class",
      `/class/${req.params.id}`,
    ]);
    res.status(200).json(deletedClass);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

async function promoteClassHandler(req, res) {
  try {
    const validData = promoteClassInofValidator.parse(req.body);
    await promoteClass(validData.classId, validData.newClassId);
    await invalidateSchoolCache(req.user.schoolId, [
      "/class",
      `/class/${req.params.id}`,
      "/student",
    ]);
    res.status(200).json({ message: "Class promoted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function assignFeesToClassController(req, res) {
  const { classId } = req.params;
  const { feesGroups } = req.body;
  if(!feesGroups) return res.status(400).json({ error: "fees groups are required" });
  if(!classId) return res.status(400).json({ error: "class id is required" });
  try {
    await assignFeesToClass(classId, feesGroups);
    await invalidateSchoolCache(req.user.schoolId, [
      "/class",
      `/class/${req.params.id}`,
      "/fees-groups",
      `/${classId}/fees-payment-status`,
    ]);
    res.status(200).json({ message: "Fees assigned to class successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getStudentsFeesPaymentStatus(req, res) {
  try {
    const { id } = req.params;
    console.log("class Id :" + id);
    const studentsPaymentInfo = [];
    const students = await StudentModel.find({ classId: id });
    for (const student of students) {
      const studentPayments = await PaymentModel.find({
        studentId: student._id,
      }).populate("paidFees pendingFees feesToBePaid");
      studentsPaymentInfo.push({
        student,
        studentPayments:
          studentPayments.length > 0
            ? studentPayments
            : "no student payment found for this student",
      });
    }
    res.status(200).json(studentsPaymentInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
    s;
  }
}

const getClassesBySubjectId = async (req, res) => {
  try {
    const { subjectId } = req.params;

    if (!subjectId) {
      return res.status(400).json({ error: "Subject ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({ error: "Invalid subject ID" });
    }

    if (!(await SubjectModel.findById(subjectId))) {
      return res.status(400).json({ error: "Subject not found" });
    }

    const classes = await ClassModel.find({ subjects: { $in: [subjectId] } });
    res.status(200).json(classes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};

module.exports = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getFormattedClasses,
  promoteClassHandler,
  assignFeesToClassController,
  getStudentsFeesPaymentStatus,
  getClassesBySubjectId,
};
