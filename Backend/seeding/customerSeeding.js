const mongoose = require('mongoose');
const Customer = require("../models/customerModel");
const Branch = require('../models/branchModel');
const seedCustomers = async () => {
  await mongoose.connect('mongodb://localhost:27017/pawn_gold');

  const branches = await Branch.find();

  const customers = [];

  for (let i = 0; i < 100; i++) {
    const branch = branches[Math.floor(Math.random() * branches.length)];

    const customer = new Customer({
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `123456789${i}`,
      branch: branch._id,
      kycStatus: 'pending',
      documents: {
        aadharNumber: `Aadhar${i + 1}`,
        panNumber: `PAN${i + 1}`,
        uploadedFiles: [],
      },
      loans: [],
      password: 'password123',
      role: 'user',
      approvedLoans: [],
      rejectedLoans: [],
      transactions: [],
    });

    customers.push(customer);

    // Add customer to branch
    branch.customers.push(customer._id);
    await branch.save();
  }

  await Customer.insertMany(customers);
  console.log('100 customers seeded');
  mongoose.connection.close();
};

seedCustomers();
