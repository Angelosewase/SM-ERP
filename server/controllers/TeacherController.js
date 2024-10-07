const {TeacherModel} = require("../models/Schemas");

// GET all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await TeacherModel.find().populate("subjects classes");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a new teacher
const createTeacher = async (req, res) => {
  const { firstName, lastName, email, schoolId, subjects, classes } = req.body;
  try {
    const newTeacher = await TeacherModel.create({ firstName, lastName, email, schoolId, subjects, classes });
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a teacher by ID
const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await TeacherModel.findByIdAndDelete(id);
    res.status(200).json(deletedTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a teacher by ID
const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedTeacher = await TeacherModel.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTeachers, createTeacher, deleteTeacher, updateTeacher };
