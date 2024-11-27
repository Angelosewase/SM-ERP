const express = require('express');
const { getTransactions, createTransaction, deleteTransaction, updateTransaction } = require('../controllers/transactionsController');
const {authenticate} = require("../middlewares/auth");
const cacheMiddleware = require('../cache/middleware/cacheMiddleware');

const router = express.Router();
router.use(authenticate)

router.get('/', cacheMiddleware(300),getTransactions);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);
router.put('/:id', updateTransaction);

module.exports = router;
