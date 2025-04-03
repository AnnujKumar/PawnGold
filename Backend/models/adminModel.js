const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  role: { 
    type: String, 
    enum: ["super_admin", "owner", "branch_head", "staff"], 
    required: true 
  },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" }, // User belongs to a branch
  createdAt: { type: Date, default: Date.now },
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loan" }]
});

// Hash the password before saving the admin
adminSchema.pre('save', async function(next) {
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
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate auth token
adminSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email, role: this.role }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
  return token;
};

module.exports = mongoose.model("Admin", adminSchema);
