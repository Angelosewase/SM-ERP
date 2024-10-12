const express = require("express");
const { SchoolModel } = require("../models/Schemas");

const {
  RegisterSchool,
  deleteSchool,
  getSchoolById,
  getSchools,
} = require("../controllers/SchoolController");


const router = express.Router();
router.post("/register", RegisterSchool);
router.get("/:id",getSchoolById);
router.get("/",getSchools);

module.exports = router;
