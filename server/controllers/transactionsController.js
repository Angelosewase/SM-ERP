const {FinancialTransactionModel} = require("../models/Schemas");

const getTransactions = async (req, res) => {
  try {
    const transactions = await FinancialTransactionModel.find().populate("studentId");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createTransaction = async (req, res) => {
  const { studentId, amount, transactionType, status } = req.body;
  try {
    const newTransaction = await FinancialTransactionModel.create({ studentId, amount, transactionType, status });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await FinancialTransactionModel.findByIdAndDelete(id);
    res.status(200).json(deletedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedTransaction = await FinancialTransactionModel.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTransactions, createTransaction, deleteTransaction, updateTransaction };
