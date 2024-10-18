const { ParentModel, StudentModel, SchoolModel } = require("../models/Schemas");
const { getSchoolIdFromToken } = require("../utils/jwt");
const { createParentValidator, updateParentValidator } = require("../validators/parent");

const getParents = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const parents = await ParentModel.find({ schoolId: schoolId }).populate(
      "child"
    );
    res.status(200).json(parents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const createParent = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }



  try {
    createParentValidator.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
  }

  const { firstName, lastName, email, address, phoneNumber, child, gender } =
    req.body;
  try {
    const newParent = await ParentModel.create({
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      child,
      gender,
      schoolId,
    });
    await StudentModel.findByIdAndUpdate(child, {
      $push: { parents: newParent._id },
    });

    console.log(schoolId);
    await SchoolModel.findByIdAndUpdate(schoolId, {
      $push: { Parents: newParent._id },
    });

    res.status(201).json(newParent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteParent = async (req, res) => {
  const { id } = req.params;

  try {
    const parent = await ParentModel.findById(id).populate("child");

    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }
    await StudentModel.updateMany(
      { _id: { $in: parent.child } },
      { $pull: { parents: parent._id } }
    );
    await SchoolModel.findByIdAndUpdate(parent.schoolId, {
      $pull: {
        Parents: parent._id,
      },
    });

    const deletedParent = await ParentModel.findByIdAndDelete(id);

    // await AttendanceModel.deleteMany({ parentId: parent._id });
    // await FinancialTransactionModel.deleteMany({ parentId: parent._id });

    res.status(200).json(deletedParent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateParent = async (req, res) => {
  const { id } = req.params;

  try {
    const validData = updateParentValidator.parse(req.body);
    const updatedParent = await ParentModel.findByIdAndUpdate(id, validData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedParent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getParentById = async (req, res) => {
  try {
    const parentId = req.params.id;
    const parent = await ParentModel.findById(parentId);

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    res.status(200).json(parent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getParents,
  createParent,
  deleteParent,
  updateParent,
  getParentById,
};
