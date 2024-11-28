const { z } = require("zod");
const { ParentModel, StudentModel, SchoolModel } = require("../models/Schemas");
const {
  createParentValidator,
  updateParentValidator,
} = require("../validators/parent.validator");
const {
  invalidateSchoolCache,
} = require("../cache/services/cacheInvalidation");
const getParents = async (req, res) => {
  const schoolId = req.user.schoolId;
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
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }

  try {
    createParentValidator.parse({...req.body, schoolId});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
  }

  try {
   const validatedData = createParentValidator.parse({...req.body, schoolId});
    const newParent = await ParentModel.create(validatedData);
    await StudentModel.findByIdAndUpdate(validatedData.child, {
      $push: { parents: newParent._id },
    });

    console.log(schoolId);
    await SchoolModel.findByIdAndUpdate(schoolId, {
      $push: { Parents: newParent._id },
    });
    await invalidateSchoolCache(schoolId, [
      "/parent",
      `/parent/${newParent._id}`,
    ]);
    await invalidateSchoolCache(schoolId, [
      "/student",
      `/student/${validatedData.child}`,
    ]);

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
    await invalidateSchoolCache(parent.schoolId, [
      "/parent",
      `/parent/${id}`,
    ]);

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
    await invalidateSchoolCache(updatedParent.schoolId, [
      "/parent",
      `/parent/${id}`,
    ]);
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
