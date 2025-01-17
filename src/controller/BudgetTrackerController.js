const Budget = require('../model/BudgetTracker');

// Create a new budget
const createBudget = async (req, res) => {
  try {
    // Extract data from the request body
    const { accounts, spendingLimit, totalMoney } = req.body;

    // Ensure the required fields are provided
    if (!accounts || !spendingLimit || totalMoney === undefined) {
      return res.status(400).json({
        message: "Missing required fields: accounts, spendingLimit, or totalMoney"
      });
    }

    // Find if a budget already exists
    let budget = await Budget.findOne({});

    if (budget) {
      // If a budget exists, update the accounts and recalculate totalMoney
      budget.accounts.bank += accounts.bank || 0;
      budget.accounts.mobileMoney += accounts.mobileMoney || 0;
      budget.accounts.cash += accounts.cash || 0;

      // Recalculate the totalMoney
      budget.totalMoney = budget.accounts.bank + budget.accounts.mobileMoney + budget.accounts.cash;

      // Update the spending limit if provided
      if (spendingLimit !== undefined) {
        budget.spendingLimit = spendingLimit;
      }

      // Save the updated budget
      await budget.save();

      return res.status(200).json({
        message: "Budget updated successfully",
        budget: budget,
      });
    } else {
      // If no budget exists, create a new budget
      const newBudget = new Budget({
        accounts: accounts,
        spendingLimit: spendingLimit,
        totalMoney: totalMoney,
      });

      await newBudget.save();

      return res.status(201).json({
        message: "Budget created successfully",
        budget: newBudget,
      });
    }
  } catch (error) {
    console.error("Error handling budget:", error);
    res.status(500).json({
      message: "Failed to handle budget",
      error: error.message,
    });
  }
};


const getBudget = async (req, res) => {
  try {
    // Fetch the budget from the database
    const budget = await Budget.findOne(); // Ensure Budget is correctly imported and connected to your database
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Respond with the fetched budget
    return res.status(200).json({
      message: 'Budget fetched successfully',
      budget, // This will include the budget object
    });
  } catch (error) {
    console.error('Error fetching budget:', error);
    return res.status(500).json({
      message: 'Failed to fetch budget',
      error: error.message, // Consider logging the full error for debugging
    });
  }
};
// Update the account balances dynamically
const updateAccountBalances = async (req, res) => {
  try {
    const { accounts } = req.body; // Dynamic input
    const updatedBudget = await Budget.findOneAndUpdate(
      {},
      { $set: { accounts } },
      { new: true }
    );
    res.status(200).json({
      message: 'Account balances updated successfully',
      budget: updatedBudget,
    });
  } catch (error) {
    console.error('Error updating account balances:', error);
    res.status(500).json({
      message: 'Failed to update account balances',
      error: error.message,
    });
  }
};

// Delete a budget by ID
const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBudget = await Budget.findByIdAndDelete(id);

    if (!deletedBudget) {
      return res.status(404).json({
        message: 'Budget not found',
      });
    }

    res.status(200).json({
      message: 'Budget deleted successfully',
      budget: deletedBudget,
    });
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({
      message: 'Failed to delete budget',
      error: error.message,
    });
  }
};

// Get the spending limit
const getSpendingLimit = async (req, res) => {
  try {
    const budget = await Budget.findOne();

    if (!budget) {
      return res.status(404).json({
        message: 'Budget not found',
      });
    }

    res.status(200).json({
      spendingLimit: budget.spendingLimit,
    });
  } catch (error) {
    console.error('Error fetching spending limit:', error);
    res.status(500).json({
      message: 'Failed to fetch spending limit',
      error: error.message,
    });
  }
};

// Update spending limit dynamically
const updateSpendingLimit = async (req, res) => {
  try {
    const { spendingLimit } = req.body;
    const updatedBudget = await Budget.findOneAndUpdate(
      {},
      { $set: { spendingLimit } },
      { new: true }
    );
    res.status(200).json({
      message: 'Spending limit updated successfully',
      budget: updatedBudget,
    });
  } catch (error) {
    console.error('Error updating spending limit:', error);
    res.status(500).json({
      message: 'Failed to update spending limit',
      error: error.message,
    });
  }
};

// Add an expense dynamically
const addExpense = async (req, res) => {
  try {
    const { expenseAmount } = req.body;
    const budget = await Budget.findOne();

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    const newTotalExpenses = (budget.totalExpenses || 0) + expenseAmount;
    if (newTotalExpenses > budget.spendingLimit) {
      return res.status(400).json({ message: "You've exceeded your spending limit!" });
    }

    const updatedBudget = await Budget.findOneAndUpdate(
      {},
      { $set: { totalExpenses: newTotalExpenses } },
      { new: true }
    );
    res.status(200).json({
      message: 'Expense added successfully',
      budget: updatedBudget,
    });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({
      message: 'Failed to add expense',
      error: error.message,
    });
  }
};

module.exports = {
  createBudget,
  getBudget,
  updateAccountBalances,
  updateSpendingLimit,
  addExpense,
  getSpendingLimit,
  deleteBudget,
};
