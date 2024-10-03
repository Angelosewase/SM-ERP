const express = require('express');
const mongoose = require('mongoose');
const School = require('./models/School');  // Assuming the School model is in models/School
const { schoolValidationSchema } = require('./validations/school');  // Zod validation schema

const router = express.Router();

// 1. Register a New School
router.post('/schools', async (req, res) => {
  try {
    // Validate the request body using Zod
    const validatedData = schoolValidationSchema.parse(req.body);

    // Create a new school
    const newSchool = new School(validatedData);
    await newSchool.save();

    res.status(201).json({ message: 'School registered successfully', school: newSchool });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If validation error, respond with details
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// 2. Get a Single School by ID
router.get('/schools/:id', async (req, res) => {
  try {
    const schoolId = req.params.id;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      return res.status(400).json({ error: 'Invalid school ID' });
    }

    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }

    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// 3. Get All Schools
router.get('/schools', async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.delete('/schools/:id', async (req, res) => {
  try {
    const schoolId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      return res.status(400).json({ error: 'Invalid school ID' });
    }

    const deletedSchool = await School.findByIdAndDelete(schoolId);

    if (!deletedSchool) {
      return res.status(404).json({ error: 'School not found' });
    }

    res.status(200).json({ message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
