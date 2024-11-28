const { TeacherModel, SchoolModel, ClassModel, SubjectModel, ProfilePicModel, UserModel } = require("../models/Schemas");
const {
  createTeacherValidator,
  updateTeacherValidator,
  teacherIdValidator,
} = require("../validators/teacher.validator");
const { z } = require("zod");
const { invalidateSchoolCache } = require("../cache/services/cacheInvalidation");

const getTeachers = async (req, res) => {
  const schoolId = req.user.schoolId;
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
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const validatedData = createTeacherValidator.parse({
      ...req.body,
      schoolId,
    });
   

    const schoolExists = SchoolModel.exists({ _id: validatedData.schoolId });
    if (!schoolExists) {
      res.status(404).send({ message: "school not found" });
      return;
    }
    const newTeacher = await TeacherModel.create(validatedData);
    await SchoolModel.findByIdAndUpdate(validatedData.schoolId, {
      $push: {
        teachers: newTeacher._id,
      },
    });
    await invalidateSchoolCache(req.user.schoolId, ['/teacher', `/teacher/${newTeacher._id}`]);
    res.status(201).json(newTeacher);
  } catch (error) {
    console.log(error);
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

    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
      const deletedTeacher = await TeacherModel.findByIdAndDelete(validatedId, { session });
      if (!deletedTeacher) {
        await session.abortTransaction();
        return res.status(404).json({ error: "Teacher not found" });
      }

      await SchoolModel.updateOne(
        { teachers: validatedId },
        { $pull: { teachers: validatedId } },
        { session }
      );

      const associatedUser = await UserModel.findOne({ teacher: validatedId }).session(session);
      if (associatedUser) {
        associatedUser.teacher = null;
        await associatedUser.save({ session });
      }

      await invalidateSchoolCache(req.user.schoolId, ['/teacher', `/teacher/${validatedId}`]);

      await session.commitTransaction();
      res.status(200).json(deletedTeacher);

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

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
    await invalidateSchoolCache(req.user.schoolId, ['/teacher', `/teacher/${validatedId}`]);
    res.status(200).json(updatedTeacher);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

const getTeacherById = async (req,res) => {
  const id = req.params.id;
  try {
    const teacher = await TeacherModel.findById(id).populate("subjects classes");
    if(!teacher){
      res.status(404).json({message :"teacher not found"})
      return
    }
     res.status(200).json(teacher);
  } catch (error) {
    console.error("TeacherController.js line 145: " + error);
     res.status(500).json({message:"internal server error"})
  }
};


async function uploadTeaherImage(req, res) {
  if (!req.file) {
    res.status(400).send({ message: "No file uploaded" });
    return;
  }
  profileImage = req.file.path;

  const { id } = req.params;
  if(!id){
    res.status(400).send({message: "no teacher id provided"})
  return;
  }
  const teacher = await TeacherModel.findById(id);
  if (!teacher) {
    res.status(404).send({ message: "teacher not found" });
    return
  }
  try {
    const result = await uploadToCloudinary(profileImage);
    const profilepic = new ProfilePicModel({
      userId: id,
      url: result.url,
      secure_url: result.secure_url,
    });
    await profilepic.save();

    res.status(201).json({
      message: "uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
  await invalidateSchoolCache(req.user.schoolId, ['/teacher', `/teacher/${id}`]);
}

module.exports = { getTeachers, createTeacher, deleteTeacher, updateTeacher ,getTeacherById, uploadTeaherImage};
