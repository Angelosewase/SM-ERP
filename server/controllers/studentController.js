const { StudentModel, ClassModel, SchoolModel } = require("../models/Schemas");
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
        classId: studentObj.classId.name,
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
    const newStudent = await StudentModel.create({
      firstName: validateData.firstName,
      lastName: validateData.lastName,
      email: validateData.email,
      schoolId: validateData.schoolId,
      classId: validateData.classId,
      parents: validateData.parents,
      gender: validateData.gender,
    });

    await SchoolModel.findByIdAndUpdate(validateData.schoolId, {
      $push: { students: newStudent._id },
    });
    await ClassModel.findByIdAndUpdate(validateData.classId, {
      $push: { students: newStudent._id },
    });

    res.status(201).json(newStudent);
  } catch (error) {
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
};
