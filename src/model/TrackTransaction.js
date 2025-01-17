const mongoose = require('mongoose');

// Define the schema for the transaction
const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  account: {
    type: String,
    enum: ['bank', 'mobile', 'cash'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  }
});

// Create the model based on the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
