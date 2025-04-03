const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const transactionModel = require("../models/transactionSchema");
const loanModel = require("../models/loanModel");
const customerModel = require("../models/customerModel");
const branchModel = require("../models/branchModel");

const seedTransactions = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/pawn_gold");

    console.log("Connected to MongoDB");

    // Generate fake transactions
    const transactions = [];
    for (let i = 0; i < 100; i++) {
      const loans = await loanModel.findOne().skip(Math.floor(Math.random() * 10));
      const customer = await customerModel.findOne().skip(Math.floor(Math.random() * 10));
      const branch = await branchModel.findOne().skip(Math.floor(Math.random() * 10));

      const transaction = new transactionModel({
        loanId: loans._id,
        loan:loans._id,
        customerId: customer._id,
        branchId: branch._id,
        amount: faker.finance.amount(),
        interestPaid: faker.finance.amount(),
        principalPaid: faker.finance.amount(),
        transactionDate: new Date()
      });

      transactions.push(transaction);

      // Add transaction to loan and customer
      loans.transactions.push(transaction._id);
      customer.transactions.push(transaction._id);

      await loans.save();
      await customer.save();
    }

    // Save transactions to the database
    await transactionModel.insertMany(transactions);

    console.log("Seeded transactions successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding transactions:", error);
    mongoose.connection.close();
  }
};

seedTransactions();
