
const { getSchoolIdFromToken } = require("../utils/jwt");

const {FeeModel, FeeGroupModel} = require("../models/Schemas");
const createFee = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);

  try {
    const { classId, feeType, amount, dueDate } = req.body;
    const fee = new FeeModel({ schoolId, classId, feeType, amount, dueDate });
    await fee.save();
    return res.status(201).json(fee);
  } catch (error) {
    return res.status(500).json({ message: "Error creating fee", error });
  }
};

const getFeesBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { classId } = req.query;
    const filter = { schoolId };
    if (classId) filter.classId = classId;

    const fees = await FeeModel.find(filter);
    return res.status(200).json(fees);
  } catch (error) {
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
    const updatedData = req.body;
    const fee = await FeeModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!fee) return res.status(404).json({ message: "Fee not found" });
    return res.status(200).json(fee);
  } catch (error) {
    return res.status(500).json({ message: "Error updating fee", error });
  }
};

const deleteFee = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await FeeModel.findByIdAndDelete(id);
    if (!fee) return res.status(404).json({ message: "Fee not found" });
    return res.status(200).json({ message: "Fee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting fee", error });
  }
};



const createFeeGroup = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
  try {
    const { name, description } = req.body;
    const feeGroup = new FeeGroupModel({ name, description, schoolId });
    await feeGroup.save();

    
    return res.status(201).json(feeGroup);
  } catch (error) {
    return res.status(500).json({ message: "Error creating fee group", error });
  }
};

const getFeeGroupsBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const feeGroups = await FeeGroupModel.find({ schoolId });
    return res.status(200).json(feeGroups);
  } catch (error) {
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
    const updatedData = req.body;
    const feeGroup = await FeeGroupModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!feeGroup)
      return res.status(404).json({ message: "Fee group not found" });
    return res.status(200).json(feeGroup);
  } catch (error) {
    return res.status(500).json({ message: "Error updating fee group", error });
  }
};


const deleteFeeGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const feeGroup = await FeeGroupModel.findByIdAndDelete(id);
    if (!feeGroup)
      return res.status(404).json({ message: "Fee group not found" });
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
