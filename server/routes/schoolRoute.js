const express = require("express");
const {SchoolModel} = require("../models/Schemas"); 

const {
  RegisterSchool,
  deleteSchool,
  getSchoolById,
} = require("../controllers/SchoolController");

const router = express.Router();
router.post("/register", RegisterSchool);
router.get("/:id", getSchoolById);
router.get("/", async (req, res) => {
  try {
    const schools = await SchoolModel.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.delete("/:id", deleteSchool);

module.exports = router;
