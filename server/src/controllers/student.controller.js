const {
  StudentModel,
  ClassModel,
  SchoolModel,
  ParentModel,
  FinancialTransactionModel,
  AttendanceModel,
  ExamResultsModel,
  PaymentModel,
  ProfilePicModel,
  FeesAssignmentModel,
} = require("../models/Schemas");
const { z } = require("zod");
const {
  registerStudentValidator,
  updateStudentValidator,
  promoteStudentValidator,
} = require("../validators/student.validator");
const { objectIdValidator } = require("../validators/user.validator");
const { promoteStudent } = require("../services/student.service");
const { uploadToCloudinary } = require("../config/cloudinary");
const {
  invalidateSchoolCache,
} = require("../cache/services/cacheInvalidation");

const getStudents = async (req, res) => {
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const students = await StudentModel.find({ schoolId })
      .populate("classId")
      .lean();

    const studentResponse = students.map((studentObj) => {
      return {
        ...studentObj,
        classId: studentObj.classId ? studentObj.classId.name || "" : "",
      };
    });
    res.status(200).json(studentResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStudent = async (req, res) => {
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  const { firstName, lastName, email, classId, parents, gender } = req.body;

  try {
    const validateData = registerStudentValidator.parse({
      firstName,
      lastName,
      classId,
      gender,
      email,
      schoolId,
      classId,
      parents,
    });

    const school = await SchoolModel.findById(schoolId);
    const Class = await ClassModel.findById(classId);

    if (!school) {
      res.status(404).send({ message: "school not found" });
      return;
    }

    if (!Class) {
      res.status(404).send({ message: "class not found" });
      return;
    }
    isFeesAssigned = await FeesAssignmentModel.findOne({
      classId: validateData.classId,
    });

    const newStudent = await StudentModel.create({
      ...validateData,
      feesStatus: isFeesAssigned ? "unpaid" : "unassigned",
    });

    await SchoolModel.findByIdAndUpdate(validateData.schoolId, {
      $push: { students: newStudent._id },
    });
    await ClassModel.findByIdAndUpdate(validateData.classId, {
      $push: { students: newStudent._id },
    });
    await invalidateSchoolCache(req.user.schoolId, [
      "/student",
      `/student/${newStudent._id}`,
      "/class",
      `/class/${validateData.classId}`,
    ]);
    res.status(201).json(newStudent);
  } catch (error) {
    console.log("studentController.js line 176: " + error);
    console.log(req.body);

    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const validatedId = objectIdValidator.parse(id);
    const student = await StudentModel.findById(validatedId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await ParentModel.deleteMany({ _id: { $in: student.parents } });
    await FinancialTransactionModel.deleteMany({ studentId: student._id });
    await AttendanceModel.deleteMany({ studentId: student._id });
    await ExamResultsModel.deleteMany({ studentId: student._id });
    await PaymentModel.deleteMany({ studentId: student._id });

    await ClassModel.updateMany(
      { students: student._id },
      { $pull: { students: student._id } }
    );
    await SchoolModel.findByIdAndUpdate(student.schoolId, {
      $pull: {
        students: student._id,
        Parents: { $in: student.parents },
      },
    });

    const deletedStudent = await StudentModel.findByIdAndDelete(validatedId);
    await invalidateSchoolCache(req.user.schoolId, [
      "/student",
      `/student/${validatedId}`,
      "/class",
      `/class/${student.classId}`,
      "/parent",
    ]);

    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const validID = objectIdValidator.parse(id);

    const validatedData = updateStudentValidator.parse(req.body);
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      validID,
      validatedData,
      { new: true }
    );
    await invalidateSchoolCache(req.user.schoolId, [
      "/student",
      `/student/${validID}`,
      "/class",
      `/class/${validatedData.classId}`,
    ]);
    res.status(200).json(updatedStudent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};

async function getStudentbyStudentId(req, res) {
  const { id } = req.params;

  try {
    const student = await StudentModel.findById(id).populate("classId", "name");

    if (!student) {
      res.status(404).send({ message: "student not found" });
      return;
    }
    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "failed fetching user" });
  }
}

async function promoteStudentHandler(req, res) {
  try {
    const validateData = promoteStudentValidator.parse(req.body);
    await promoteStudent(
      validateData.studentId,
      validateData.fromClassId,
      validateData.toClassId
    );
    await invalidateSchoolCache(req.user.schoolId, [
      "/student",
      `/student/${validateData.studentId}`,
      "/class",
      `/class/${validateData.fromClassId}`,
      `/class/${validateData.toClassId} `,
    ]);
    res.status(200).json({ message: "Student promoted successfully" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "error promoting student", error: error.message });
  }
}

async function uploadStudentImage(req, res) {
  if (!req.file) {
    res.status(400).send({ message: "No file uploaded" });
    return;
  }
  profileImage = req.file.path;

  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "no student id provided" });
    return;
  }
  const student = await StudentModel.findById(id);
  if (!student) {
    res.status(404).send({ message: "student not found" });
    return;
  }
  try {
    const result = await uploadToCloudinary(profileImage);
    const profilepic = new ProfilePicModel({
      userId: id,
      url: result.url,
      secure_url: result.secure_url,
    });
    await profilepic.save();
    await invalidateSchoolCache(req.user.schoolId, [
      "/student",
      `/student/${id}`,
    ]);

    res.status(201).json({
      message: "uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

const getStudentsByClass = async (req, res) => {
  const { classId } = req.params;
  try {
    const students = await StudentModel.find({ classId });

    if (!students) {
      return res
        .status(404)
        .json({ message: "No students found for this class" });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students by class" });
  }
};

async function getStudentFeesPaymentStatus(req, res) {
  try {
    const { id } = req.params;
    const studentPayments = await PaymentModel.find({ studentId: id }).populate(
      "paidFees",
      "pendingFees",
      "feesToBePaid"
    );
    res.status(200).json(studentPayments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student fees payment status" });
  }
}

module.exports = {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  promoteStudentHandler,
  getStudentbyStudentId,
  uploadStudentImage,
  getStudentsByClass,
  getStudentFeesPaymentStatus,
};
