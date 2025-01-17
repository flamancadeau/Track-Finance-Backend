const mongoose = require("mongoose");

// Define the Budget Schema
const BudgetSchema = new mongoose.Schema(
  {
    accounts: {
      bank: { type: Number, default: 0 }, // Bank balance
      mobileMoney: { type: Number, default: 0 }, // Mobile Money balance
      cash: { type: Number, default: 0 }, // Cash balance
    },
    spendingLimit: { type: Number, default: 0 }, // Spending limit
    totalMoney: { type: Number, default: 0 }, // Total money available
    createdAt: { type: Date, default: Date.now }, // Record creation timestamp
    updatedAt: { type: Date, default: Date.now }, // Record update timestamp
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Budget Model
const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;
