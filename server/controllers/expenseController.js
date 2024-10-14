const { ExpenseModel } = require("../models/Schemas");
const {getSchoolIdFromToken} = require('../utils/jwt')

const createExpenseRecord = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const { name, amount, transactionType, status ,paymentDate} = req.body;
    const newExpenseRecord = new ExpenseModel({
      name,
      schoolId,
      amount,
      transactionType,
      status,
      paymentDate
    });
    await newExpenseRecord.save();
    res.status(201).json(newExpenseRecord);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to create expense record" });
  }
};

const getAllExpenseRecords = async (req, res) => {
  const schoolId = getSchoolIdFromToken(req.cookies.token);
  if (!schoolId) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  try {
    const expenseRecords = await ExpenseModel.find({schoolId:schoolId}).populate("schoolId");
    res.status(200).json(expenseRecords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expense records" });
  }
};


const getExpenseRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseRecord = await ExpenseModel.findById(id);
    if (!expenseRecord) {
      return res.status(404).json({ error: "Expense record not found" });
    }
    res.status(200).json(expenseRecord);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expense record" });
  }
};



const updateExpenseRecord = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedExpenseRecord = await ExpenseModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedExpenseRecord) {
        return res.status(404).json({ error: "Expense record not found" });
      }
      res.status(200).json(updatedExpenseRecord);
    } catch (error) {
      res.status(500).json({ error: "Failed to update expense record" });
    }
  };

  const deleteExpenseRecord = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedExpenseRecord = await ExpenseModel.findByIdAndDelete(id);
      if (!deletedExpenseRecord) {
        return res.status(404).json({ error: "Expense record not found" });
      }
      res.status(200).json({ message: "Expense record deleted successfully" });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Failed to delete expense record" });
    }
  };
  

  module.exports = {getExpenseRecordById,updateExpenseRecord,getAllExpenseRecords,createExpenseRecord,deleteExpenseRecord}
