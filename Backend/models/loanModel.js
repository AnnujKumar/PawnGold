const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true }, // Reference to the customer
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" }, // Branch issuing the loan
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true }, // Percentage
  tenure: { type: Number, required: true }, // In months
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected", "closed"], 
    default: "pending" 
  },                                                                         
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Branch Head or Owner
  amountPaid: { type: Number, default: 0 }, // Amount paid by the customer
  amountLeft: { type: Number, required: true }, // Amount left to be paid
  gold_weight: { type: Number, required: true }, // in grams
  valuation: { type: Number, required: true }, // gold value at the time of loan
  totalInterestCollected: { type: Number, default: 0 }, // total interest collected
  totalPrincipalCollected:{type:Number,default:0}, // total principal collected
  createdAt: { type: Date, default: Date.now },
  transactions:[{type:mongoose.Schema.Types.ObjectId, ref:"Transaction"}]
});

// Calculate the amount left before saving the loan
LoanSchema.pre('save', function(next) {
  this.amountLeft = this.amount - this.amountPaid;
  next();
});

module.exports = mongoose.model("Loan", LoanSchema);
