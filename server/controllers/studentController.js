const {StudentModel} = require("../models/Schemas");

// GET all students
const getStudents = async (req, res) => {
  try {
    const students = await StudentModel.find().populate("schoolId classId parents");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a new student
const createStudent = async (req, res) => {
  const { firstName, lastName, email, schoolId, classId, parents, gender } = req.body;
  try {
    const newStudent = await StudentModel.create({ firstName, lastName, email, schoolId, classId, parents, gender });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a student by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await StudentModel.findByIdAndDelete(id);
    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a student by ID
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getStudents, createStudent, deleteStudent, updateStudent };
