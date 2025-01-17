const TrackTransaction = require('../model/TrackTransaction');

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { type, amount, dateTime, account, category, subcategory } = req.body;

    const transaction = new TrackTransaction({
      type,
      amount,
      dateTime,
      account,
      category, // Add category here
      subcategory, // Add subcategory here
    });

    await transaction.save();
    res.status(201).json({
      message: 'Transaction created successfully',
      transaction
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({
      message: 'Failed to create transaction',
      error: error.message,
    });
  }
};

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await TrackTransaction.find();
    res.status(200).json({
      message: 'Transactions fetched successfully',
      transactions,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      message: 'Failed to fetch transactions',
      error: error.message,
    });
  }
};

const DateTransactions = async (req, res) => {
  try {
    // Extract query parameters
    const { startDate, endDate, accountType } = req.query;

    // Build query object dynamically based on received filters
    let query = {};

    if (startDate && endDate) {
      query.dateTime = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    if (accountType && accountType !== 'all') {
      query.account = accountType;
    }

    // Fetch filtered transactions from the database
    const transactions = await TrackTransaction.find(query);

    res.status(200).json(transactions); // Send the filtered transactions
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      message: 'Failed to fetch transactions',
      error: error.message,
    });
  }
};
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params; // Extract transaction ID from the URL parameters

    // Attempt to delete the transaction by ID
    const transaction = await TrackTransaction.findByIdAndDelete(id);





    // If the transaction doesn't exist, return an error
    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      });
    }

    res.status(200).json({
      message: 'Transaction deleted successfully',
      transaction
    });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({
      message: 'Failed to delete transaction',
      error: error.message,
    });
  }
};

// Get transactions by type (income or expense)
const getTransactionsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const transactions = await TrackTransaction.find({ type });
    res.status(200).json({
      message: `${type} transactions fetched successfully`,
      transactions,
    });
  } catch (error) {
    console.error('Error fetching transactions by type:', error);
    res.status(500).json({
      message: 'Failed to fetch transactions',
      error: error.message,
    });
  }
};

// Get transactions by account
const getTransactionsByAccount = async (req, res) => {
  try {
    const { account } = req.params;
    const transactions = await TrackTransaction.find({ account });
    res.status(200).json({
      message: `Transactions for account ${account} fetched successfully`,
      transactions,
    });
  } catch (error) {
    console.error('Error fetching transactions by account:', error);
    res.status(500).json({
      message: 'Failed to fetch transactions',
      error: error.message,
    });
  }
};

// Get transactions by date range
const getTransactionsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const transactions = await TrackTransaction.find({
      dateTime: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).populate('category subcategory'); // populate category and subcategory

    res.status(200).json({
      message: `Transactions from ${startDate} to ${endDate} fetched successfully`,
      transactions,
    });
  } catch (error) {
    console.error('Error fetching transactions by date range:', error);
    res.status(500).json({
      message: 'Failed to fetch transactions',
      error: error.message,
    });
  }
};
 const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, dateTime, account, category, subcategory } = req.body;

    const updatedTransaction = await TrackTransaction.findByIdAndUpdate(
      id,
      { type, amount, dateTime, account, category, subcategory },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      });
    }

    res.status(200).json({
      message: 'Transaction updated successfully',
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({
      message: 'Failed to update transaction',
      error: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionsByType,
  getTransactionsByAccount,
  getTransactionsByDateRange,
  deleteTransaction,
  DateTransactions,
  updateTransaction,

};
