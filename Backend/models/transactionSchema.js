const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  loanId: String,
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  amount: { type: Number, required: true },
  interestPaid: { type: Number, default: 0 }, // part of amount that went towards interest
  principalPaid: { type: Number, default: 0 }, // part of amount that went towards principal
  paymentMethod: { type: String, default: "Cash" },
  loan: {type:mongoose.Schema.Types.ObjectId,ref:"Loan",required:true},
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  referenceNumber: { type: String },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
