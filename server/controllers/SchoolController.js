const mongoose = require("mongoose");
const z = require("zod");
const { schoolValidationSchema, schoolUpdateSchema } = require("../validators/school");
const { UserModel, SchoolModel } = require("../models/Schemas");
const { getSchoolIdFromToken } = require("../utils/jwt");

async function RegisterSchool(req, res) {
  try {
    const { schoolName, address, email, admin } = req.body;
    const validatedData = schoolValidationSchema.parse({
      schoolName,
      address,
      email,
      admin,
    });

    const newSchool = new SchoolModel({
      name: validatedData.schoolName,
      address: validatedData.address,
      email: validatedData.email,
      admin: validatedData.admin,
    });
    await newSchool.save();
    await UserModel.updateOne(
      { _id: admin },
      {
        $set: {
          school: newSchool._id,
        },
      }
    );

    res
      .status(201)
      .json({ message: "School registered successfully", school: newSchool });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function getSchoolById(req, res) {
  try {
    const schoolId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      return res.status(400).json({ error: "Invalid school ID" });
    }

    const school = await SchoolModel.findById(schoolId);

    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }

    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function deleteSchool(req, res) {
  try {
    const schoolId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      return res.status(400).json({ error: "Invalid school ID" });
    }

    const deletedSchool = await SchoolModel.findByIdAndDelete(schoolId);

    if (!deletedSchool) {
      return res.status(404).json({ error: "School not found" });
    }

    res.status(200).json({ message: "School deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

const getSchools = async (req, res) => {
  try {
    const schools = await SchoolModel.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateSchool = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const validatedData = schoolUpdateSchema.parse(req.body);

    const updatedSchool = await SchoolModel.findByIdAndUpdate(
      schoolId,
      validatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSchool) {
      return res.status(404).json({ message: "School not found" });
    }

    res.status(200).json(updatedSchool);
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  RegisterSchool,
  getSchoolById,
  deleteSchool,
  getSchools,
  updateSchool,
};
