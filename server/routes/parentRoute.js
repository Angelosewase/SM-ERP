const express = require('express');
const { getParents, createParent, deleteParent, updateParent, getParentById } = require('../controllers/parentController');

const router = express.Router();

router.get('/', getParents);
router.post('/', createParent);
router.delete('/:id', deleteParent);
router.put('/:id', updateParent);
router.get("/:id", getParentById)

module.exports = router;
