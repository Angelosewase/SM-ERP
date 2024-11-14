const express = require("express");
const { SchoolModel } = require("../models/Schemas");

const {
  RegisterSchool,
  deleteSchool,
  getSchoolById,
  getSchools,
  updateSchool,
} = require("../controllers/SchoolController");
const {authenticate} = require("../controllers/authController")
const router = express.Router();
router.post("/register", RegisterSchool);
router.get("/:id",authenticate, getSchoolById);
router.get("/",authenticate, getSchools);
router.put("/",authenticate, updateSchool);
router.delete("/",authenticate, deleteSchool);

module.exports = router;
