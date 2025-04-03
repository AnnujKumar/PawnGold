const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" }, // Customer belongs to a branch
  kycStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
  documents: { 
    aadharNumber: { type: String, unique: true }, 
    panNumber: { type: String, unique: true },
    uploadedFiles: [{ type: String }] // URLs of uploaded documents
  },
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loan" }], // Loans associated with the customer
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role:{
    type:String,
    enum:["user"]
  },
  approvedLoans:[{type:mongoose.Schema.Types.ObjectId, ref:"Loan"}],
  rejectedLoans:[{type:mongoose.Schema.Types.ObjectId, ref:"Loan"}],
  transactions:[{type:mongoose.Schema.Types.ObjectId, ref:"Transaction"}]
});

// Hash the password before saving the customer
CustomerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
CustomerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate auth token
CustomerSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
  return token;
};

module.exports = mongoose.model("Customer", CustomerSchema);

