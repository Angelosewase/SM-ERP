const { ParentModel, StudentModel, SchoolModel } = require("../models/Schemas");
const { getSchoolIdFromToken } = require("../utils/jwt");

const getParents = async (req, res) => {
  try {
    const parents = await ParentModel.find().populate("child");
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createParent = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
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
    });
    await StudentModel.findByIdAndUpdate(child, {
      $push: { parents: newParent._id },
    });
   

    console.log(schoolId)
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
    const deletedParent = await ParentModel.findByIdAndDelete(id);
    res.status(200).json(deletedParent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateParent = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedParent = await ParentModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedParent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getParents, createParent, deleteParent, updateParent };
