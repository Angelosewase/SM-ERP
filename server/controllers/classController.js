const { ClassModel } = require("../models/Class");
const { createClassValidator, updateClassValidator } = require("../validators/class");
const { z } = require("zod");
const mongoose = require("mongoose");

// Get all classes
const getClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find().populate("students subjects");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single class by ID
const getClassById = async (req, res) => {
  const { id } = req.params;
  
  const idValidator = z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), "Invalid class ID");

  try {
    const validatedId = idValidator.parse(id);
    const classData = await ClassModel.findById(validatedId).populate("students subjects");
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new class
const createClass = async (req, res) => {
  try {
    const validatedData = createClassValidator.parse(req.body);

    const newClass = await ClassModel.create(validatedData);
    res.status(201).json(newClass);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update a class by ID
const updateClass = async (req, res) => {
  const { id } = req.params;
  
  const idValidator = z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), "Invalid class ID");

  try {
    const validatedId = idValidator.parse(id);
    const validatedData = updateClassValidator.parse(req.body);

    const updatedClass = await ClassModel.findByIdAndUpdate(validatedId, validatedData, { new: true }).populate("students subjects");
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

// Delete a class by ID
const deleteClass = async (req, res) => {
  const { id } = req.params;
  
  const idValidator = z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), "Invalid class ID");

  try {
    const validatedId = idValidator.parse(id);

    const deletedClass = await ClassModel.findByIdAndDelete(validatedId);
    if (!deletedClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json(deletedClass);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getClasses, getClassById, createClass, updateClass, deleteClass };
