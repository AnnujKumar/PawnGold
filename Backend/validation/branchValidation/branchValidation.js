const Joi = require("joi");
const mongoose = require("mongoose");

const branchValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  location: Joi.string().min(3).max(255).required(),
  owner: Joi.string().email().required(),
  branchHead: Joi.string().email().required(),
});

module.exports = branchValidationSchema;
