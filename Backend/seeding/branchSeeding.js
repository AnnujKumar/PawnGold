const mongoose = require('mongoose');
const Branch = require('../models/branchModel');
const User = require('../models/adminModel'); // Assuming there's a User model for owners and branch heads

const seedBranches = async () => {
  await mongoose.connect(`mongodb://localhost:27017/pawn_gold`);

  const users = await User.find();

  const branches = [];

  for (let i = 0; i < 100; i++) {
    const owner = users[Math.floor(Math.random() * users.length)];
    const branchHead = users[Math.floor(Math.random() * users.length)];

    const branch = new Branch({
      name: `Branch ${i + 1}`,
      location: `Location ${i + 1}`,
      owner: owner._id,
      branchHead: branchHead._id,
      staff: [],
      customers: [],
      totalGold: Math.random() * 1000,
      totalLoanApproved: Math.random() * 1000000,
      totalAmountCollected: Math.random() * 500000,
      totalPrincipalCollected: Math.random() * 500000,
      totalInterestCollected: Math.random() * 500000,
      createdAt: new Date(),
      loans: [],
      approvedLoans: [],
      rejectedLoans: [],
    });

    branches.push(branch);
  }

  await Branch.insertMany(branches);
  console.log('100 branches seeded');
  mongoose.connection.close();
};

seedBranches();
