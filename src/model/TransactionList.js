const mongoose = require('mongoose');

// Define the schema
const TransactionListSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true, 
  },
  subcategory: {
    type: String,
    required: true,
    trim: true, 
  },
}, {
  timestamps: true, 
});


const TransactionList = mongoose.model('TransactionList', TransactionListSchema);

module.exports = TransactionList;
