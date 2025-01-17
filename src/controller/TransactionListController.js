const TransactionList = require('../model/TransactionList');

// Create a new transaction
const createTransaction = async (req, res) => {
  const { category, subcategory } = req.body;

  try {
    const newTransaction = new TransactionList({
      category,
      subcategory,
    });

    const savedTransaction = await newTransaction.save();

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: savedTransaction,
    });
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({
      message: "Failed to create transaction",
      error: err.message,
    });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionList.find();
    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.status(200).json({
      message: "Transactions fetched successfully",
      transactions,
    });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({
      message: "Failed to fetch transactions",
      error: err.message,
    });
  }
};

// Get a specific transaction by ID
const getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await TransactionList.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction found",
      transaction,
    });
  } catch (err) {
    console.error("Error fetching transaction:", err);
    res.status(500).json({
      message: "Failed to fetch transaction",
      error: err.message,
    });
  }
};

// Update a transaction by ID
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { category, subcategory } = req.body;

  try {
    const updatedTransaction = await TransactionList.findByIdAndUpdate(
      id,
      { category, subcategory },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({
      message: "Failed to update transaction",
      error: err.message,
    });
  }
};

// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await TransactionList.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      transaction: deletedTransaction,
    });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({
      message: "Failed to delete transaction",
      error: err.message,
    });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
