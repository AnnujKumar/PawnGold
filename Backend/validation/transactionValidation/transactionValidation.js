const Joi = require("joi");
const mongoose = require("mongoose");

const transactionValidationSchema = Joi.object({
  loanId: Joi.string().required(),
  branchId: Joi.string().required(),
  amount: Joi.number().positive().required(),
  customer:Joi.string(),
  transactionDate: Joi.date().default(() => new Date()),
});

module.exports = transactionValidationSchema;
