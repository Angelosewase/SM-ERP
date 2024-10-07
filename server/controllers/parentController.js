const {ParentModel} = require("../models/Schemas");

// GET all parents
const getParents = async (req, res) => {
  try {
    const parents = await ParentModel.find().populate("child");
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a new parent
const createParent = async (req, res) => {
  const { firstName, lastName, email, address, phoneNumber, child } = req.body;
  try {
    const newParent = await ParentModel.create({ firstName, lastName, email, address, phoneNumber, child });
    res.status(201).json(newParent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a parent by ID
const deleteParent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedParent = await ParentModel.findByIdAndDelete(id);
    res.status(200).json(deletedParent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a parent by ID
const updateParent = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedParent = await ParentModel.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedParent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getParents, createParent, deleteParent, updateParent };
