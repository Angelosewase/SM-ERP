const { SubjectModel, TeacherModel, ClassModel } = require("../models/Schemas");
const mongoose = require("mongoose");
const {
  invalidateSchoolCache,
} = require("../cache/services/cacheInvalidation");
const { createSubjectValidator } = require("../validators/subject");
const { z } = require("zod");

const createSubject = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }

  try {
    const validatedData = await createSubjectValidator.parseAsync(req.body);
    const { name, teachers, description, classes, days } = validatedData;
    const newSubject = new SubjectModel({
      name,
      teachers,
      description,
      classes,
      days,
      schoolId,
    });

    await newSubject.save({ session });

    await TeacherModel.updateMany(
      { _id: { $in: teachers } },
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
    await invalidateSchoolCache(schoolId, [
      "/subject",
      `/subject/${newSubject._id}`,
    ]);
    res.status(201).json(newSubject);
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: error.message });
    }
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: "Failed to create subject" });
  }
};

const getAllSubjects = async (req, res) => {
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const subjects = await SubjectModel.find({ schoolId }).populate("teachers");
    // .populate("classes", "name");

    res.status(200).json(subjects);
  } catch (error) {
    invalidateSchoolCache(req.user.schoolId, ["/subject"]);
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await SubjectModel.findById(id)
      .populate("classes", "name")
      .populate("teachers", "firstName  lastName");

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
    const validatedData = updateSubjectValidator.parse(req.body);

    const updatedSubject = await SubjectModel.findByIdAndUpdate(
      id,
      validatedData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("teacherId")
      .populate("classes", "className");

    if (!updatedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    await invalidateSchoolCache(req.user.schoolId, [
      "/subject",
      `/subject/${updateSubject._id}`,
    ]);
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subject" });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subjectTodelete = SubjectModel.findById(id);
    if (!id) {
      res.status(404).send({ message: "subject not found" });
      return;
    }

    await TeacherModel.findByIdAndUpdate(subjectTodelete.teacherId, {
      $pull: {
        subjects: subjectTodelete._id,
      },
    });

    const deletedSubject = await SubjectModel.findByIdAndDelete(id);
    if (!deletedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
    await invalidateSchoolCache(req.user.schoolId, [
      "/subject",
      `/subject/${deleteSubject._id}`,
    ]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subject" });
  }
};

//function to get subject by class id
const getSubjectsByClassId = async (req, res) => {
  try {
    const { id } = req.params;
    const subjects = await SubjectModel.find({ classes: id });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
  getSubjectById,
  getSubjectsByClassId,
};
