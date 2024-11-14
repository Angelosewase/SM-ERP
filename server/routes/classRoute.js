const express = require("express");
const router = express.Router();
const cacheMiddleware = require('../cache/middleware/cacheMiddleware');
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

router.use(authenticate);

// Cache GET requests for 5 minutes (300 seconds)
router.get("/", cacheMiddleware(300), getClasses);
router.get("/fmt", cacheMiddleware(300), getFormatedClasses);
router.get("/:id", cacheMiddleware(300), getClassById);

router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);
router.post("/promote", promoteclassHandler);

module.exports = router;
