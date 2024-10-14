const {
  StudentModel,
  ClassModel,
  SchoolModel,
  ParentModel,
  FinancialTransactionModel,
  AttendanceModel,
  ExamResultsModel,
  PaymentModel,
} = require("../models/Schemas");
const { z } = require("zod");
const mongoose = require("mongoose");
const {
  registerStudentValidator,
  updateStudentValidator,
  promoteStudentValidator,
} = require("../validators/student");
const { objectIdValidator } = require("../validators/user");
const { getSchoolIdFromToken } = require("../utils/jwt");
const { promoteStudent } = require("../services/studentService");

const getStudents = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
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
  const schoolId = getSchoolIdFromToken(req.cookies.token);
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
    const newStudent = await StudentModel.create(validateData);

    await SchoolModel.findByIdAndUpdate(validateData.schoolId, {
      $push: { students: newStudent._id },
    });
    await ClassModel.findByIdAndUpdate(validateData.classId, {
      $push: { students: newStudent._id },
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.log(error);
    console.log(req.body)
    
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
  const { studentId, fromClassId, toClassId } = req.body;
  try {
    const validateData = promoteStudentValidator.parse(req.body);
    await promoteStudent(
      validateData.studentId,
      validateData.fromClassId,
      validateData.toClassId
    );
  } catch (error) {
    res.status(400).send({ message: "error promoting student" });
  }
}

module.exports = {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  promoteStudentHandler,
  getStudentbyStudentId,
};
