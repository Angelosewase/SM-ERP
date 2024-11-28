const express = require("express");
const {
  getParents,
  createParent,
  deleteParent,
  updateParent,
  getParentById,
} = require("../controllers/parent.controller");
const { authenticate } = require("../middlewares/auth");
const cacheMiddleware = require("../cache/middleware/cache.middleware");

const router = express.Router();
router.use(authenticate);

router.get("/", cacheMiddleware(300), getParents);
router.post("/", createParent);
router.delete("/:id", deleteParent);
router.put("/:id", updateParent);
router.get("/:id", getParentById);

module.exports = router;
