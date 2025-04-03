const Joi = require('joi');

const ownerAdminRegisterValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("super_admin", "owner", "branch_head", "staff").required(),
  branch: Joi.string().optional() // Assuming branch is optional during registration
});
const ownerAdminLoginValidation = Joi.object({
  email:Joi.string().email().required(),  
  password: Joi.string().required()  
})

module.exports.ownerAdminRegisterValidation = ownerAdminRegisterValidation;
module.exports.ownerAdminLoginValidation = ownerAdminLoginValidation;
