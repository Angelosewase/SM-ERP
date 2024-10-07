const express = require('express');
const { getTransactions, createTransaction, deleteTransaction, updateTransaction } = require('../controllers/transactionsController');

const router = express.Router();
router.get('/', getTransactions);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);
router.put('/:id', updateTransaction);

module.exports = router;
