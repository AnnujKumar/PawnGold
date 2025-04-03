const transactionModel = require("../../models/transactionSchema");
const loanModel = require("../../models/loanModel");
const customerModel = require("../../models/customerModel");
const branchModel = require("../../models/branchModel");
const validateTransaction = require("../../validation/transactionValidation/transactionValidation");

const createTransaction = async (req, res) => {
  try {
    const { error } = await validateTransaction.validateAsync(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      loanId,
      amount,
    } = req.body;

    const isValidLoan = await loanModel.findById(loanId);
    if (!isValidLoan) {
      return res.status(400).json({ message: "Invalid Loan" });
    }
    const interest = isValidLoan.interestRate / (100*12);
    const interestPaid = isValidLoan.amountLeft * interest;
    const principalPaid = amount  - interestPaid;
    const transaction = new transactionModel({
      loanId,
      customerId: isValidLoan.customer,
      branchId: isValidLoan.branch,
      amount,
      interestPaid,
      principalPaid,
      loan:loanId

    });

    await transaction.save();

    isValidLoan.transactions.push(transaction._id);
    isValidLoan.amountPaid += amount;
    isValidLoan.totalInterestCollected += interestPaid;
    isValidLoan.totalPrincipalCollected += principalPaid;
    await isValidLoan.save();

    const customer = await customerModel.findById(isValidLoan.customer);
    if (!customer) {
      return res.status(400).json({ message: "Invalid customer" });
    }

    customer.transactions.push(transaction._id);
    await customer.save();

    const branch = await branchModel.findById(isValidLoan.branch);
    if (!branch) {
      return res.status(400).json({ message: "Invalid Branch" });
    }

    branch.totalAmountCollected += amount;
    branch.totalInterestCollected += interestPaid;
    branch.totalPrincipalCollected += principalPaid;
    await branch.save();


    res.status(201).json({ transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTransaction };