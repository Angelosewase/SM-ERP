const {
  invalidateSchoolCache,
} = require("../cache/services/cacheInvalidation");

const { z } = require("zod");
const {
  createFeeValidator,
  updateFeeValidator,
  createFeeGroupValidator,
  updateFeeGroupValidator,
} = require("../validators/fees.validator.js");
const { FeeModel, FeeGroupModel } = require("../models/Schemas");
const { recordFeesPayment } = require("../services/fees.service.js");

const createFee = async (req, res) => {
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  try {
    const validatedData = createFeeValidator.parse({
      schoolId,
      ...req.body,
    });
    const { classId, feeType, amount } = validatedData;
    const fee = new FeeModel({ schoolId, classId, feeType, amount });
    await fee.save();
    await invalidateSchoolCache(schoolId, ["/fees", `/fees/${fee._id}`]);
    return res.status(201).json(fee);
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    return res.status(500).json({ message: "Error creating fee", error });
  }
};

const getFeesBySchool = async (req, res) => {
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  try {
    const { classId } = req.query;
    if (classId) {
      classIdValidator.parse(classId);
    }

    const filter = { schoolId };
    if (classId) filter.classId = classId;

    const fees = await FeeModel.find(filter);
    return res.status(200).json(fees);
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    return res.status(500).json({ message: "Error fetching fees", error });
  }
};

const getFeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await FeeModel.findById(id);
    if (!fee) return res.status(404).json({ message: "Fee not found" });
    return res.status(200).json(fee);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching fee", error });
  }
};

const updateFee = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = updateFeeValidator.parse(req.body);

    const fee = await FeeModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!fee) return res.status(404).json({ message: "Fee not found" });
    await invalidateSchoolCache(req.user.schoolId, [
      "/fees",
      `/fees/${fee._id}`,
    ]);
    return res.status(200).json(fee);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    return res.status(500).json({ message: "Error updating fee", error });
  }
};

const deleteFee = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await FeeModel.findByIdAndDelete(id);
    if (!fee) return res.status(404).json({ message: "Fee not found" });
    await invalidateSchoolCache(req.user.schoolId, [
      "/fees",
      `/fees/${fee._id}`,
    ]);
    return res.status(200).json({ message: "Fee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting fee", error });
  }
};

// fees groups

const createFeeGroup = async (req, res) => {
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  try {
    const validatedData = createFeeGroupValidator.parse({
      schoolId,
      ...req.body,
    });
    const { name, description, fees } = validatedData;

    const amount = await fees.reduce(async (promise, feeID) => {
      const sum = await promise;
      const fee = await FeeModel.findById(feeID);
      if (!fee) {
        throw new Error(`Fee with ID ${feeID} not found`);
      }
      return sum + fee.amount;
    }, Promise.resolve(0));

    console.log(amount);

    const feeGroup = new FeeGroupModel({
      name,
      description,
      schoolId,
      amount,
      fees,
    });
    await feeGroup.save();
    await invalidateSchoolCache(req.user.schoolId, [
      "/fees-groups",
      `/fees-groups/${feeGroup._id}`,
    ]);

    return res.status(201).json(feeGroup);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    return res.status(500).json({ message: "Error creating fee group", error });
  }
};

const getFeeGroupsBySchool = async (req, res) => {
  const schoolId = req.user.schoolId;
  if (!schoolId) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  try {
    const feeGroups = await FeeGroupModel.find({ schoolId });
    return res.status(200).json(feeGroups);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching fee groups", error });
  }
};

const getFeeGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const feeGroup = await FeeGroupModel.findById(id);
    if (!feeGroup)
      return res.status(404).json({ message: "Fee group not found" });
    return res.status(200).json(feeGroup);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching fee group", error });
  }
};

const updateFeeGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = updateFeeGroupValidator.parse(req.body);

    const feeGroup = await FeeGroupModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!feeGroup)
      return res.status(404).json({ message: "Fee group not found" });
    await invalidateSchoolCache(req.user.schoolId, [
      "/fees-groups",
      `/fees-groups/${feeGroup._id}`,
    ]);
    return res.status(200).json(feeGroup);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    return res.status(500).json({ message: "Error updating fee group", error });
  }
};

const deleteFeeGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const feeGroup = await FeeGroupModel.findByIdAndDelete(id);
    if (!feeGroup)
      return res.status(404).json({ message: "Fee group not found" });
    await invalidateSchoolCache(req.user.schoolId, [
      "/fees-groups",
      `/fees-groups/${feeGroup._id}`,
    ]);
    return res.status(200).json({ message: "Fee group deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting fee group", error });
  }
};


module.exports = {
  createFee,
  getFeesBySchool,
  getFeeById,
  updateFee,
  deleteFee,
  createFeeGroup,
  getFeeGroupsBySchool,
  getFeeGroupById,
  updateFeeGroup,
  deleteFeeGroup,
};
