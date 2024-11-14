const express = require("express");
const router = express.Router();
const {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getFormatedClasses,
  promoteclassHandler,
} = require("../controllers/classController");
const {authenticate} = require("../controllers/authController")
router.use(authenticate)

router.get("/", getClasses);
router.get("/fmt", getFormatedClasses);
router.get("/:id", getClassById);
router.post("/", createClass);
router.put("/:id", updateClass)
router.delete("/:id", deleteClass);
router.post("/promote", promoteclassHandler)

module.exports = router;
