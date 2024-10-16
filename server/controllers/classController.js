const { ClassModel, SchoolModel, ScheduleModel, StudentModel, SubjectModel, TeacherModel } = require("../models/Schemas");
const {
  createClassValidator,
  updateClassValidator,
  promoteClassInofValidator,
} = require("../validators/class");
const { z } = require("zod");
const mongoose = require("mongoose");
const { getSchoolIdFromToken } = require("../utils/jwt");
const {
  promoteClass,
  convertClassesToValueNamePairs,
} = require("../services/classService");

const getClasses = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
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



const getFormatedClasses = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
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
    const classData = await ClassModel.findById(validatedId).populate(
      "students"
    ).populate("subjects", "name").populate("schoolId");
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClass = async (req, res) => {
  const schoolID = getSchoolIdFromToken(req.cookies.token);
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
    })
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

    // Check if the class exists
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

    res.status(200).json(deletedClass);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};
async function promoteclassHandler(req, res) {
  try {
    const validData = promoteClassInofValidator(req.body);
    promoteClass(validData.classId, validData.newClassId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getFormatedClasses,
  promoteclassHandler
};
