const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Owner of the branch
  branchHead: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Branch head
  staff: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Staff members
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }], // Customers linked to this branch
  totalGold: { type: Number, default: 0 }, // Total gold in grams
  totalLoanApproved: { type: Number, default: 0 }, // Total loan amount approved
  totalAmountCollected: { type: Number, default: 0 }, // Total interest collected
  totalPrincipalCollected: { type: Number, default: 0 }, // Total principal,
  totalInterestCollected: { type: Number, default: 0 }, // Total interest
  createdAt: { type: Date, default: Date.now },
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loan" }],
  approvedLoans:[{type:mongoose.Schema.Types.ObjectId,ref:"Loan"}],
  rejectedLoans:[{type:mongoose.Schema.Types.ObjectId,ref:"Loan"}]
});

module.exports = mongoose.model("Branch", BranchSchema);
