const express = require('express');
const { createBudget, getBudget, updateAccountBalances, updateSpendingLimit, addExpense,deleteBudget,getSpendingLimit } = require('../controller/BudgetTrackerController');

const router = express.Router();

// Route to create a budget
router.post('/badget', createBudget);

// Route to get the current budget
router.get('/badget', getBudget);

// Route to update account balances
router.put('/update/accounts', updateAccountBalances);

// Route to update the spending limit
router.put('/update/spending-limit', updateSpendingLimit);
router.get('/spendingLimit', getSpendingLimit);
// Route to add an expense
router.put('/add-expense', addExpense);
router.delete('/badget/:id', deleteBudget);


module.exports = router;
