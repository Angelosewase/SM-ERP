const { TeacherModel, SchoolModel } = require("../models/Schemas");
const { getSchoolIdFromToken } = require("../utils/jwt");
const {
  createTeacherValidator,
  updateTeacherValidator,
  teacherIdValidator,
} = require("../validators/teacher");

const getTeachers = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }

  try {
    const teachers = await TeacherModel.find({ schoolId }).populate(
      "subjects classes"
    );
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTeacher = async (req, res) => {
  try {
    const validatedData = createTeacherValidator.parse(req.body);
    const schoolExists = SchoolModel.exists({ _id: validatedData.schoolId });
    if (!schoolExists) {
      res.status(404).send({ message: "school not found" });
      return;
    }
    const newTeacher = await TeacherModel.create(validatedData);
    res.status(201).json(newTeacher);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const validatedId = teacherIdValidator.parse(id);

    const deletedTeacher = await TeacherModel.findByIdAndDelete(validatedId);
    if (!deletedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json(deletedTeacher);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const validatedId = teacherIdValidator.parse(id);
    const validatedData = updateTeacherValidator.parse(req.body);

    const updatedTeacher = await TeacherModel.findByIdAndUpdate(
      validatedId,
      validatedData,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTeachers, createTeacher, deleteTeacher, updateTeacher };
