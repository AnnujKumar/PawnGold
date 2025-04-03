const mongoose = require('mongoose');
const Loan = require('../models/loanModel');
const Customer = require('../models/customerModel');
const Branch = require('../models/branchModel');
const Admin = require('../models/adminModel'); // Assuming there's an Admin model
const Transaction = require('../models/transactionSchema'); // Assuming there's a Transaction model

const seedLoans = async () => {
  await mongoose.connect('mongodb://localhost:27017/pawn_gold');

  const customers = await Customer.find();
  const branches = await Branch.find();
  const admins = await Admin.find();
  const transactions = await Transaction.find();

  const loans = [];

  for (let i = 0; i < 100; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];
    const admin = admins[Math.floor(Math.random() * admins.length)];
    const transaction = transactions[Math.floor(Math.random() * transactions.length)];

    const loan = new Loan({
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customer: customer._id,
      branch: branch._id,
      amount: Math.floor(Math.random() * 100000) + 1000,
      interestRate: Math.random() * 10 + 1,
      tenure: Math.floor(Math.random() * 24) + 1,
      status: 'pending',
      approvedBy: admin._id,
      amountPaid: 0,
      amountLeft: 0,
      gold_weight: Math.random() * 100 + 1,
      valuation: Math.random() * 5000 + 1000,
      totalInterestCollected: 0,
      totalPrincipalCollected: 0,
      createdAt: new Date(),
      transactions: [transaction._id],
    });

    loans.push(loan);

    // Add loan to customer and branch
    customer.loans.push(loan._id);
    branch.loans.push(loan._id);

    // Add customer to branch if not already added
    if (!branch.customers.includes(customer._id)) {
      branch.customers.push(customer._id);
    }

    await customer.save();
    await branch.save();
  }

  await Loan.insertMany(loans);
  console.log('100 loans seeded');
  mongoose.connection.close();
};

seedLoans();
