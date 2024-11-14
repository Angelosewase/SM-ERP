const express = require('express');
const { getTransactions, createTransaction, deleteTransaction, updateTransaction } = require('../controllers/transactionsController');
const {authenticate} = require("../controllers/authController")

const router = express.Router();
router.use(authenticate)

router.get('/', getTransactions);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);
router.put('/:id', updateTransaction);

module.exports = router;
