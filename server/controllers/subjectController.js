const { SubjectModel } = require("../models/Schemas");
const { getSchoolIdFromToken } = require("../utils/jwt");

const createSubject = async (req, res) => {
  try {
    const { name, teacherId, description, classes, days } = req.body;
    const newSubject = new SubjectModel({
      name,
      teacherId,
      description,
      classes,
      days,
    });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create subject" });
  }
};

const getAllSubjects = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const subjects = await SubjectModel.find({ schoolId })
      .populate("teacherId", "name")
      .populate("classes", "className");

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await SubjectModel.findById(id)
      .populate("teacherId", "name")
      .populate("classes", "className");

    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subject" });
  }
};

const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedSubject = await SubjectModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("teacherId", "name")
      .populate("classes", "className");

    if (!updatedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subject" });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubject = await SubjectModel.findByIdAndDelete(id);
    if (!deletedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subject" });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
  getSubjectById,
};
