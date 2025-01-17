const express = require('express');
const { createTransaction, getTransactions, getTransactionsByType,updateTransaction,getTransactionsByAccount,DateTransactions,getTransactionsByDateRange,deleteTransaction } = require('../controller/TrackTransaction');

const router = express.Router();

// Route to create a new transaction
router.post('/createTransaction', createTransaction);

// Route to get all transactions
router.get('/getTransactions', getTransactions);

// Route to get transactions by type (income or expense)
router.get('/type/:type', getTransactionsByType);

// Route to get transactions by account (mobile money, cash, bank)
router.get('/account/:account', getTransactionsByAccount);
router.delete("/deleteTransaction/:id",deleteTransaction);
// Route to get transactions within a date range
// router.get('/dateRange', getTransactionsByDateRange);
router.get("/DateTransactions",DateTransactions);
router.put("/updateTransaction/:id",updateTransaction);
module.exports = router;
