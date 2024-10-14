const { SubjectModel, TeacherModel, ClassModel } = require("../models/Schemas");
const { getSchoolIdFromToken } = require("../utils/jwt");
const mongoose = require('mongoose')

const createSubject = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const schoolId = getSchoolIdFromToken(req.cookies.token);
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }

  try {
    const { name, teacherId, description, classes, days } = req.body;
    const newSubject = new SubjectModel({
      name,
      teacherId,
      description,
      classes,
      days,
      schoolId,
    });

    await newSubject.save({ session });

    await TeacherModel.findByIdAndUpdate(
      teacherId,
      { $push: { subjects: newSubject._id } },
      { new: true, session }
    );

    await ClassModel.updateMany(
      { _id: { $in: classes } },
      { $push: { subjects: newSubject._id } },
      { session }
    );
    await session.commitTransaction();
    session.endSession();
    res.status(201).json(newSubject);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
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
      .populate("teacherId")
      // .populate("classes", "name");

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await SubjectModel.findById(id)
      .populate("classes", "name");

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
