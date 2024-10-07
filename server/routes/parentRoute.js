const express = require('express');
const { getParents, createParent, deleteParent, updateParent } = require('../controllers/parentController');

const router = express.Router();

router.get('/', getParents);
router.post('/', createParent);
router.delete('/:id', deleteParent);
router.put('/:id', updateParent);

module.exports = router;
