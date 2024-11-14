const express = require('express');
const { getParents, createParent, deleteParent, updateParent, getParentById } = require('../controllers/parentController');
const {authenticate} = require("../controllers/authController")
const cacheMiddleware = require('../cache/middleware/cacheMiddleware');

const router = express.Router();
router.use(authenticate)

router.get('/', cacheMiddleware(300), getParents);
router.post('/', createParent);
router.delete('/:id', deleteParent);
router.put('/:id', updateParent);
router.get("/:id", getParentById)

module.exports = router;
