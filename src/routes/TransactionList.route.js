const express = require('express');
const router = express.Router();
const {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
} = require('../controller/TransactionListController');


router.post('/transactionList', createTransaction);


router.get('/transactionList', getAllTransactions);


router.get('/transactionList/:id', getTransactionById);

router.put('/transactionList/:id', updateTransaction);

// Delete a transaction by ID
router.delete('/transactionList/:id', deleteTransaction);

module.exports = router;
