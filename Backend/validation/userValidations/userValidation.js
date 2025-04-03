const Joi = require('joi');

const userRegisterValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone:Joi.string().min(10).max(10).required(),  
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user").required(),
  branch: Joi.string().optional() 
});
const userLoginValidation = Joi.object({
  email:Joi.string().email().required(),  
  password: Joi.string().required()  
})

module.exports.userRegisterValidation = userRegisterValidation;
module.exports.userLoginValidation = userLoginValidation;
