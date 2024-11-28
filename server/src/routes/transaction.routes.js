const express = require('express');
const { getTransactions, createTransaction, deleteTransaction, updateTransaction } = require('../controllers/transactions.controller');
const {authenticate} = require("../middlewares/auth");
const cacheMiddleware = require('../cache/middleware/cache.middleware');

const router = express.Router();
router.use(authenticate)

router.get('/', cacheMiddleware(300),getTransactions);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);
router.put('/:id', updateTransaction);

module.exports = router;
